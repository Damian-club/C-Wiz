"use client";

import { useState } from 'react';
import { PlaylistCard } from '@/components/music/playlist-card';
import { mockPlaylists, mockTracks, mockAlbums } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { CreatePlaylistModal } from '@/components/music/create-playlist-modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrackItem } from '@/components/music/track-item';
import { AlbumCard } from '@/components/music/album-card';
import { usePlayer } from '@/contexts/player-context';
import type { Track } from '@/types/music';

export default function LibraryPage() {
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
  // For a real app, these would come from user data
  const userPlaylists = mockPlaylists.filter(p => p.id === 'p1' || p.id === 'p3'); // Mock: user owns these
  const likedTracks = mockTracks.slice(0, 3); // Mock: user liked these
  const savedAlbums = mockAlbums.slice(0, 2); // Mock: user saved these

  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const handlePlayTrack = (track: Track) => {
    playTrack(track, likedTracks);
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-4xl font-bold">Tu Biblioteca</h1>
        <Button onClick={() => setIsCreatePlaylistModalOpen(true)}>Crear Playlist</Button>
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="albums">álbumes</TabsTrigger>
          <TabsTrigger value="tracks">Canciones que me gustaron</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists">
          {userPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
              {userPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Aún no has creado ni guardado ninguna lista de reproducción.</p>
          )}
        </TabsContent>

        <TabsContent value="albums">
          {savedAlbums.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
              {savedAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Aún no has guardado ningún álbum.</p>
          )}
        </TabsContent>

        <TabsContent value="tracks">
          {likedTracks.length > 0 ? (
             <div className="space-y-2 mt-6 border rounded-md p-2">
              {likedTracks.map((track, index) => (
                <TrackItem 
                  key={track.id} 
                  track={track} 
                  onPlay={() => handlePlayTrack(track)}
                  isPlaying={currentTrack?.id === track.id && isPlaying}
                  isActive={currentTrack?.id === track.id}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Aún no te ha gustado ninguna canción.</p>
          )}
        </TabsContent>
      </Tabs>
      
      <CreatePlaylistModal isOpen={isCreatePlaylistModalOpen} onClose={() => setIsCreatePlaylistModalOpen(false)} />
    </div>
  );
}
