"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { getPlaylistById, mockPlaylists } from '@/lib/mock-data'; // Assuming mockPlaylists is also exported for fallback
import type { Playlist as PlaylistType, Track } from '@/types/music';
import { TrackItem } from '@/components/music/track-item';
import { Button } from '@/components/ui/button';
import { PlayCircle, Shuffle, ListFilter, ArrowDownAZ, ArrowUpAZ, CalendarDays, UserCircle, Disc3 } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { suggestPlaylistTitle } from '@/ai/flows/suggest-playlist-title';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

type SortKey = 'title' | 'artist' | 'album' | 'year' | 'default';
type SortDirection = 'asc' | 'desc';

export default function PlaylistPage() {
  const params = useParams();
  const { id } = params;
  const [playlist, setPlaylist] = useState<PlaylistType | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortedTracks, setSortedTracks] = useState<Track[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const { playTrack, currentTrack, isPlaying } = usePlayer();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchedPlaylist = getPlaylistById(id as string);
      // Simulate API delay
      setTimeout(() => {
        setPlaylist(fetchedPlaylist || mockPlaylists[0]); // Fallback if not found
        setLoading(false);
      }, 500);
    }
  }, [id]);

  useEffect(() => {
    if (playlist) {
      let tracksToSort = [...playlist.tracks];
      if (sortKey !== 'default') {
        tracksToSort.sort((a, b) => {
          let valA = a[sortKey as keyof Omit<Track, 'id' | 'duration' | 'artwork' | 'audioSrc'>];
          let valB = b[sortKey as keyof Omit<Track, 'id' | 'duration' | 'artwork' | 'audioSrc'>];
          
          if (typeof valA === 'string' && typeof valB === 'string') {
            return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
          if (typeof valA === 'number' && typeof valB === 'number') {
            return sortDirection === 'asc' ? valA - valB : valB - valA;
          }
          return 0;
        });
      }
      setSortedTracks(tracksToSort);
    }
  }, [playlist, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handlePlayTrack = (track: Track, index: number) => {
    // Play track in context of current sorted list
    playTrack(track, sortedTracks);
  };

  const handlePlayAll = () => {
    if (sortedTracks.length > 0) {
        playTrack(sortedTracks[0], sortedTracks);
    }
  }
  
  const handleShufflePlay = () => {
    if (sortedTracks.length > 0) {
        const shuffledTracks = [...sortedTracks].sort(() => Math.random() - 0.5);
        playTrack(shuffledTracks[0], shuffledTracks);
    }
  }

  const handleSuggestTitle = async () => {
    if (!playlist || playlist.tracks.length === 0) {
      toast({ title: "Cannot suggest title", description: "Playlist is empty or not loaded.", variant: "destructive" });
      return;
    }
    try {
      const trackTitles = playlist.tracks.map(t => t.title);
      const suggestion = await suggestPlaylistTitle({ tracks: trackTitles });
      toast({ title: "AI Suggested Title", description: suggestion.title });
      // Optionally, update playlist name state here:
      // setPlaylist(prev => prev ? { ...prev, name: suggestion.title } : null);
    } catch (error) {
      console.error("Error suggesting title:", error);
      toast({ title: "AI Suggestion Failed", description: "Could not generate a title.", variant: "destructive" });
    }
  };
  
  const SortIcon = sortDirection === 'asc' ? ArrowDownAZ : ArrowUpAZ;

  if (loading || !playlist) {
     return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8 p-8 bg-muted/30 rounded-lg">
            <Skeleton className="h-48 w-48 md:h-56 md:w-56 rounded-lg shrink-0" />
            <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
            </div>
        </div>
        <div className="space-y-2">
            {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8 p-8 bg-gradient-to-b from-accent/20 to-background rounded-lg shadow-lg">
        <Image
          src={playlist.artwork || 'https://placehold.co/200x200/777777/ffffff.png?text=Playlist'}
          alt={playlist.name}
          width={200}
          height={200}
          className="rounded-lg shadow-xl aspect-square object-cover border-4 border-background"
          data-ai-hint={playlist.dataAiHint || "playlist cover"}
          priority
        />
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-primary">Playlist</p>
          <h1 className="font-headline text-5xl md:text-7xl font-bold break-words">{playlist.name}</h1>
          {playlist.description && <p className="mt-2 text-muted-foreground max-w-xl">{playlist.description}</p>}
          <p className="mt-1 text-sm text-muted-foreground">{playlist.tracks.length} songs</p>
          <div className="mt-6 flex gap-3 justify-center md:justify-start">
             <Button size="lg" onClick={handlePlayAll} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <PlayCircle className="mr-2 h-5 w-5" /> Play
            </Button>
            <Button size="lg" variant="outline" onClick={handleShufflePlay}>
              <Shuffle className="mr-2 h-5 w-5" /> Shuffle
            </Button>
            <Button size="lg" variant="outline" onClick={handleSuggestTitle}>
              Suggest Title (AI)
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" /> Sort by: {sortKey === 'default' ? 'Default' : sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}
                {sortKey !== 'default' && <SortIcon className="ml-2 h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort('default')}>Default Order</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSort('title')}><ArrowDownAZ className="mr-2 h-4 w-4" />Title</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('artist')}><UserCircle className="mr-2 h-4 w-4" />Artist</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('album')}><Disc3 className="mr-2 h-4 w-4" />Album</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('year')}><CalendarDays className="mr-2 h-4 w-4" />Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-1 border rounded-md">
          {sortedTracks.map((track, index) => (
            <TrackItem 
                key={track.id} 
                track={track} 
                onPlay={() => handlePlayTrack(track, index)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                isActive={currentTrack?.id === track.id}
                index={sortKey === 'default' ? index : undefined} // Only show index for default sort for clarity
            />
          ))}
        </div>
      </section>
    </div>
  );
}
