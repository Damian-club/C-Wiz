"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Artist } from '@/types/music';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';

type ArtistCardProps = {
  artist: Artist;
};

export function ArtistCard({ artist }: ArtistCardProps) {
  const { playTrack } = usePlayer();

  const handlePlayArtist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if play button is part of the card link
    e.stopPropagation();
    if (artist.topTracks.length > 0) {
      playTrack(artist.topTracks[0], artist.topTracks);
    }
  };

  return (
    <Link href={`/artist/${artist.id}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary">
          <CardHeader className="relative p-0">
            <Image
              src={artist.imageUrl}
              alt={artist.name}
              width={300}
              height={300}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={artist.dataAiHint || "artist portrait"}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 bg-background/70 hover:bg-primary hover:text-primary-foreground text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-10 w-10"
              onClick={handlePlayArtist}
              aria-label={`Play ${artist.name}`}
            >
              <PlayCircle size={28} />
            </Button>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="font-headline text-lg truncate">{artist.name}</CardTitle>
            <CardDescription className="text-xs truncate h-10">{artist.description}</CardDescription>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
