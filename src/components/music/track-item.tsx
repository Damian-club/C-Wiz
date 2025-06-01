"use client";

import type { Track } from '@/types/music';
import { Button } from '@/components/ui/button';
import { Play, Pause, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { usePlayer } from '@/contexts/player-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


type TrackItemProps = {
  track: Track;
  onPlay: () => void;
  isPlaying?: boolean; // Is this specific track currently playing?
  isActive?: boolean; // Is this track the one loaded in player (even if paused)
  showArtwork?: boolean;
  index?: number; // Optional index for numbered lists
};

export function TrackItem({ track, onPlay, isPlaying, isActive, showArtwork = true, index }: TrackItemProps) {
  const { playTrack } = usePlayer();

  return (
    <div className={`flex items-center p-2 rounded-md transition-colors group ${isActive ? 'bg-primary/10' : 'hover:bg-accent/10'}`}>
      {index !== undefined && (
        <div className="w-8 text-center text-muted-foreground">
          {isPlaying ? <Pause size={18} className="text-primary animate-pulse" /> : 
           isActive ? <Play size={18} className="text-primary" /> :
           <span>{index + 1}</span>
          }
        </div>
      )}
      {showArtwork && track.artwork && (
        <Image 
            src={track.artwork} 
            alt={track.title} 
            width={40} 
            height={40} 
            className="rounded mr-3 aspect-square object-cover"
            data-ai-hint="song artwork" 
        />
      )}
      <div className="flex-1 truncate">
        <p className={`font-medium truncate ${isActive ? 'text-primary' : 'text-foreground'}`}>{track.title}</p>
        <p className="text-sm text-muted-foreground truncate">{track.artist} &bull; {track.album}</p>
      </div>
      <div className="text-sm text-muted-foreground mr-4 ml-2">{track.duration}</div>
      <Button variant="ghost" size="icon" onClick={onPlay} className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
            <EllipsisVertical size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log('Añadir a la lista', track.title)}>Add to queue</DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Añadir a la playlist', track.title)}>Add to playlist</DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Ver artista', track.artist)}>Go to artist</DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Ver álbum', track.album)}>Go to album</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
