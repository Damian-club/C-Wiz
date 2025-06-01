"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockTracks } from '@/lib/mock-data';
import type { Track, Playlist } from '@/types/music';
import { suggestPlaylistTitle } from '@/ai/flows/suggest-playlist-title';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type CreatePlaylistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (newPlaylist: Playlist) => void; // Optional callback
};

export function CreatePlaylistModal({ isOpen, onClose, onCreate }: CreatePlaylistModalProps) {
  const [playlistName, setPlaylistName] = useState('');
  const [selectedTrackIds, setSelectedTrackIds] = useState<Set<string>>(new Set());
  const [isSuggestingTitle, setIsSuggestingTitle] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when modal opens/closes
    if (isOpen) {
      setPlaylistName('');
      setSelectedTrackIds(new Set());
    }
  }, [isOpen]);

  const handleTrackSelect = (trackId: string, checked: boolean | "indeterminate") => {
    setSelectedTrackIds(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(trackId);
      } else {
        newSet.delete(trackId);
      }
      return newSet;
    });
  };

  const handleSuggestTitle = async () => {
    if (selectedTrackIds.size === 0) {
      toast({ title: "Primero elige las canciones", description: "Porfavor selecciona algunas canciones para recomendar un título.", variant: "default" });
      return;
    }
    setIsSuggestingTitle(true);
    try {
      const tracksForSuggestion = mockTracks.filter(t => selectedTrackIds.has(t.id)).map(t => t.title);
      const suggestion = await suggestPlaylistTitle({ tracks: tracksForSuggestion });
      setPlaylistName(suggestion.title);
      toast({ title: "¡Título de IA recomendado!", description: `"${suggestion.title}" ha sido seleccionado como el nombre de la playlist.` });
    } catch (error) {
      console.error("Error sugiriendo el título:", error);
      toast({ title: "Sugerencia de IA fallida", description: "No se pudo generar el título.", variant: "destructive" });
    } finally {
      setIsSuggestingTitle(false);
    }
  };

  const handleCreatePlaylist = () => {
    if (!playlistName.trim()) {
      toast({ title: "Nombre de la playlist requerido", description: "Porfavor ingrese el nombre de su playlist.", variant: "destructive" });
      return;
    }
    if (selectedTrackIds.size === 0) {
      toast({ title: "Sin canciones seleccionadas", description: "Porfavor seleccione al menos una canción en su playlist.", variant: "destructive" });
      return;
    }

    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: playlistName,
      tracks: mockTracks.filter(t => selectedTrackIds.has(t.id)),
      artwork: 'https://placehold.co/300x300/cccccc/0a0a0a.png?text=New', // Default artwork
      dataAiHint: "abstract music"
    };
    
    // Here you would typically save the playlist (e.g., to a global state, backend)
    console.log("Creating playlist:", newPlaylist);
    toast({ title: "Playlist Created!", description: `"${newPlaylist.name}" has been created.` });
    onCreate?.(newPlaylist); // Call optional callback
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] translate-x-[-50%] translate-y-[-50%]">
        <DialogHeader>
          <DialogTitle className="font-headline">Crear Nueva Playlist</DialogTitle>
          <DialogDescription>Selecciona las canciones y dale un nombre a tu playlist. ¡También puedes permitirle a la IA sugerirte un título!</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="playlist-name" className="text-right">Nombre</Label>
            <Input 
              id="playlist-name" 
              value={playlistName} 
              onChange={(e) => setPlaylistName(e.target.value)} 
              className="col-span-3"
              placeholder="Mi Maravillosa Playlist"
            />
          </div>

          <Button onClick={handleSuggestTitle} variant="outline" disabled={isSuggestingTitle || selectedTrackIds.size === 0}>
            {isSuggestingTitle && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sugiere un nombre con IA
          </Button>
          
          <div>
            <Label className="text-md font-medium">Seleccionar Canciones ({selectedTrackIds.size})</Label>
            <ScrollArea className="h-[300px] mt-2 rounded-md border p-2">
              <div className="space-y-2">
                {mockTracks.map(track => (
                  <div key={track.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
                    <Checkbox 
                      id={`track-${track.id}`} 
                      checked={selectedTrackIds.has(track.id)}
                      onCheckedChange={(checked) => handleTrackSelect(track.id, checked)}
                    />
                    <label htmlFor={`track-${track.id}`} className="flex-1 text-sm cursor-pointer">
                      <span className="font-medium">{track.title}</span> - <span className="text-muted-foreground">{track.artist}</span>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleCreatePlaylist} disabled={!playlistName.trim() || selectedTrackIds.size === 0}>
            Crear Playlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
