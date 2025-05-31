"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAlbumById, mockAlbums } from '@/lib/mock-data';
import type { Album as AlbumType, Track } from '@/types/music';
import { TrackItem } from '@/components/music/track-item';
import { Button } from '@/components/ui/button';
import { PlayCircle, Shuffle } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function AlbumPage() {
  const params = useParams();
  const { id } = params;
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    if (id) {
      const fetchedAlbum = getAlbumById(id as string);
      setTimeout(() => {
        setAlbum(fetchedAlbum || mockAlbums[0]); // Fallback
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading || !album) {
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

  const handlePlayTrack = (track: Track) => {
    playTrack(track, album.tracks);
  };

  const handlePlayAll = () => {
    if (album.tracks.length > 0) {
        playTrack(album.tracks[0], album.tracks);
    }
  }
  
  const handleShufflePlay = () => {
    if (album.tracks.length > 0) {
        const shuffledTracks = [...album.tracks].sort(() => Math.random() - 0.5);
        playTrack(shuffledTracks[0], shuffledTracks);
    }
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-8 p-8 bg-gradient-to-b from-accent/20 to-background rounded-lg shadow-lg">
        <Image
          src={album.artwork}
          alt={album.title}
          width={200}
          height={200}
          className="rounded-lg shadow-xl aspect-square object-cover border-4 border-background"
          data-ai-hint={album.dataAiHint || "album art large"}
          priority
        />
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm font-semibold text-primary">Album</p>
          <h1 className="font-headline text-5xl md:text-7xl font-bold break-words">{album.title}</h1>
          <p className="mt-2 text-xl text-muted-foreground">{album.artist}</p>
          <p className="mt-1 text-sm text-muted-foreground">{album.year} &bull; {album.tracks.length} songs</p>
          <div className="mt-6 flex gap-3 justify-center md:justify-start">
             <Button size="lg" onClick={handlePlayAll} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <PlayCircle className="mr-2 h-5 w-5" /> Play Album
            </Button>
            <Button size="lg" variant="outline" onClick={handleShufflePlay}>
              <Shuffle className="mr-2 h-5 w-5" /> Shuffle
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="space-y-1 border rounded-md">
          {album.tracks.map((track, index) => (
            <TrackItem 
                key={track.id} 
                track={track} 
                onPlay={() => handlePlayTrack(track)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                isActive={currentTrack?.id === track.id}
                index={index}
                showArtwork={false} // Typically don't show artwork for tracks within album view
            />
          ))}
        </div>
      </section>
    </div>
  );
}
