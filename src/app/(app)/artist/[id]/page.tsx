"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getArtistById, mockArtists } from '@/lib/mock-data'; // Assuming mockArtists is also exported for fallback
import type { Artist as ArtistType, Track } from '@/types/music';
import { AlbumCard } from '@/components/music/album-card';
import { TrackItem } from '@/components/music/track-item';
import { Button } from '@/components/ui/button';
import { PlayCircle, Shuffle } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePlayer } from '@/contexts/player-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArtistPage() {
  const params = useParams();
  const { id } = params;
  const [artist, setArtist] = useState<ArtistType | null>(null);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    if (id) {
      const fetchedArtist = getArtistById(id as string);
      // Simulate API delay
      setTimeout(() => {
        setArtist(fetchedArtist || mockArtists[0]); // Fallback to first mock artist if not found
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading || !artist) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-64 w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="flex space-x-4 overflow-hidden">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-60 w-48 rounded-lg shrink-0" />)}
          </div>
        </div>
         <div>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="space-y-2">
            {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
          </div>
        </div>
      </div>
    );
  }

  const handlePlayTrack = (track: Track) => {
    playTrack(track, artist.topTracks);
  };

  const handlePlayAll = () => {
    if (artist.topTracks.length > 0) {
        playTrack(artist.topTracks[0], artist.topTracks);
    }
  }
  
  const handleShufflePlay = () => {
    if (artist.topTracks.length > 0) {
        const shuffledTracks = [...artist.topTracks].sort(() => Math.random() - 0.5);
        playTrack(shuffledTracks[0], shuffledTracks);
    }
  }

  return (
    <div className="space-y-10">
      <section className="relative flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8 p-8 bg-gradient-to-b from-accent/20 to-background rounded-lg shadow-lg">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          width={200}
          height={200}
          className="rounded-full shadow-xl aspect-square object-cover border-4 border-background"
          data-ai-hint={artist.dataAiHint || "artist portrait large"}
          priority
        />
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-primary">Artist</p>
          <h1 className="font-headline text-5xl md:text-7xl font-bold break-words">{artist.name}</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">{artist.description}</p>
          <div className="mt-6 flex gap-3 justify-center md:justify-start">
            <Button size="lg" onClick={handlePlayAll} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <PlayCircle className="mr-2 h-5 w-5" /> Play
            </Button>
            <Button size="lg" variant="outline" onClick={handleShufflePlay}>
              <Shuffle className="mr-2 h-5 w-5" /> Shuffle
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6">Top Tracks</h2>
        <div className="space-y-2">
          {artist.topTracks.slice(0, 5).map((track, index) => (
            <TrackItem 
                key={track.id} 
                track={track} 
                onPlay={() => handlePlayTrack(track)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                isActive={currentTrack?.id === track.id}
                index={index}
            />
          ))}
          {artist.topTracks.length > 5 && (
            <Button variant="link" className="mt-2">Show all tracks</Button> // TODO: Implement show all
          )}
        </div>
      </section>
      
      {artist.albums && artist.albums.length > 0 && (
        <section>
          <h2 className="font-headline text-3xl font-semibold mb-6">Albums</h2>
           <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {artist.albums.map((album) => (
                <div key={album.id} className="w-48 md:w-56 shrink-0">
                  <AlbumCard album={album} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
    </div>
  );
}
