"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Album } from '@/types/music';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { usePlayer } from '@/contexts/player-context';

type AlbumCardProps = {
  album: Album;
};

export function AlbumCard({ album }: AlbumCardProps) {
  const { playTrack } = usePlayer();

  const handlePlayAlbum = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (album.tracks.length > 0) {
      playTrack(album.tracks[0], album.tracks);
    }
  };
  
  return (
    <Link href={`/album/${album.id}`} passHref legacyBehavior>
      <a className="block group">
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary">
          <CardHeader className="relative p-0">
            <Image
              src={album.artwork}
              alt={album.title}
              width={300}
              height={300}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={album.dataAiHint || "album art"}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-2 right-2 bg-background/70 hover:bg-primary hover:text-primary-foreground text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full h-10 w-10"
              onClick={handlePlayAlbum}
              aria-label={`Play ${album.title}`}
            >
              <PlayCircle size={28} />
            </Button>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="font-headline text-lg truncate">{album.title}</CardTitle>
            <CardDescription className="text-sm truncate">{album.artist}</CardDescription>
            <CardDescription className="text-xs text-muted-foreground">{album.year}</CardDescription>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
