"use client";

import { usePlayer } from "@/contexts/player-context";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, ListMusic, Minimize2 } from "lucide-react";
import { FullScreenPlayerModal } from "./fullscreen-player-modal"; // Ensure this component exists
import { useState } from "react";

export function MusicPlayerBar() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    progress, 
    duration,
    togglePlayPause, 
    setVolume, 
    seek, 
    nextTrack, 
    prevTrack,
    isPlayerVisible,
    showPlayer, // Will be used by FullScreenPlayerModal to trigger visibility if needed
    hidePlayer
  } = usePlayer();

  const [isFsPlayerModalOpen, setIsFsPlayerModalOpen] = useState(false);

  if (!isPlayerVisible || !currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSeek = (value: number[]) => {
    seek((value[0] / 100) * duration);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center border-t bg-background/95 p-4 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center w-1/3">
          {currentTrack.artwork && (
            <Image 
              src={currentTrack.artwork} 
              alt={currentTrack.title} 
              width={56} height={56} 
              className="rounded aspect-square object-cover"
              data-ai-hint="song artwork" 
            />
          )}
          <div className="ml-3 truncate">
            <p className="font-semibold truncate text-sm">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={prevTrack} aria-label="Canción anterior">
              <SkipBack />
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePlayPause} className="h-10 w-10" aria-label={isPlaying ? "Pausa" : "Reproducir"}>
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={nextTrack} aria-label="Siguiente canción">
              <SkipForward />
            </Button>
          </div>
          <div className="mt-1 flex w-full max-w-xs items-center gap-2 text-xs">
            <span>{formatTime((progress / 100) * duration)}</span>
            <Slider
              defaultValue={[0]}
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={handleSeek}
              className="w-full"
              aria-label="Track progress"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end w-1/3 gap-2">
          {/* Future: Queue button <Button variant="ghost" size="icon"><ListMusic /></Button> */}
          <div className="flex items-center w-24 gap-1">
            <Button variant="ghost" size="icon" onClick={() => setVolume(volume > 0 ? 0 : 0.5)} aria-label={volume > 0 ? "Mutear" : "Desmutear"}>
              {volume === 0 ? <VolumeX /> : <Volume2 />}
            </Button>
            <Slider 
              defaultValue={[0.5]} 
              value={[volume]}
              max={1} 
              step={0.01} 
              onValueChange={handleVolumeChange}
              className="w-full"
              aria-label="Volume"
            />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsFsPlayerModalOpen(true)} aria-label="Reproductor de pantalla completa">
            <Maximize2 />
          </Button>
        </div>
      </div>
      <FullScreenPlayerModal isOpen={isFsPlayerModalOpen} onClose={() => setIsFsPlayerModalOpen(false)} />
    </>
  );
}
