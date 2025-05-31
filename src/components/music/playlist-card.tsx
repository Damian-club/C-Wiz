"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Playlist } from '@/types/music';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';

type PlaylistCardProps = {
  playlist: Playlist;
};

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { playTrack } = usePlayer();

  const handlePlayPlaylist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks);
    }
  };

  return (
    <Link href={`/playlist/${playlist.id}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary">
          <CardHeader className="relative p-0">
            <Image
              src={playlist.artwork || 'https://placehold.co/300x300/777777/ffffff.png?text=Playlist'}
              alt={playlist.name}
              width={300}
              height={300}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={playlist.dataAiHint || "music playlist"}
            />
             <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 bg-background/70 hover:bg-primary hover:text-primary-foreground text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-10 w-10"
              onClick={handlePlayPlaylist}
              aria-label={`Play ${playlist.name}`}
            >
              <PlayCircle size={28} />
            </Button>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="font-headline text-lg truncate">{playlist.name}</CardTitle>
            <CardDescription className="text-sm truncate">{playlist.description || `${playlist.tracks.length} tracks`}</CardDescription>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
