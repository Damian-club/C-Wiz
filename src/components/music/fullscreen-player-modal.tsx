"use client";

import { usePlayer } from "@/contexts/player-context";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, Minimize2, ListMusic, Shuffle, Repeat } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@/components/ui/dialog"; // Using Dialog for modal
import { Card, CardContent } from "../ui/card";

type FullScreenPlayerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FullScreenPlayerModal({ isOpen, onClose }: FullScreenPlayerModalProps) {
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
  } = usePlayer();

  if (!currentTrack) {
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-background/90 backdrop-blur-sm" />
        <DialogContent className="fixed inset-0 z-[100] flex h-screen w-screen max-w-none flex-col items-center justify-center border-0 bg-transparent p-0 shadow-none sm:rounded-none">
          <Card className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-accent/10 to-primary/10 p-6 overflow-auto">
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-6 right-6 text-foreground/70 hover:text-foreground">
              <Minimize2 size={28} />
              <span className="sr-only">Cerrar reproducto de pantalla completa</span>
            </Button>
            
            <div className="flex flex-col items-center text-center mb-8">
              {currentTrack.artwork && (
                <Image 
                  src={currentTrack.artwork} 
                  alt={currentTrack.title} 
                  width={300} height={300} 
                  className="rounded-lg shadow-2xl aspect-square object-cover mb-6"
                  data-ai-hint="song artwork large"
                />
              )}
              <h2 className="font-headline text-4xl font-bold text-foreground">{currentTrack.title}</h2>
              <p className="text-xl text-foreground/80 mt-1">{currentTrack.artist}</p>
              <p className="text-md text-foreground/60">{currentTrack.album}</p>
            </div>

            <div className="w-full max-w-md space-y-4">
              <div className="flex w-full items-center gap-2 text-xs text-foreground/80">
                <span>{formatTime((progress / 100) * duration)}</span>
                <Slider
                  defaultValue={[0]}
                  value={[progress]}
                  max={100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="w-full"
                  aria-label="Progreso canción"
                />
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                  <Shuffle size={20} />
                </Button>
                <Button variant="ghost" size="icon" onClick={prevTrack} className="text-foreground/70 hover:text-foreground" aria-label="Canción anterior">
                  <SkipBack size={28} />
                </Button>
                <Button variant="default" size="icon" onClick={togglePlayPause} className="h-16 w-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90" aria-label={isPlaying ? "Pausa" : "Reproducir"}>
                  {isPlaying ? <Pause size={36} /> : <Play size={36} className="ml-1"/>}
                </Button>
                <Button variant="ghost" size="icon" onClick={nextTrack} className="text-foreground/70 hover:text-foreground" aria-label="Siguiente canción">
                  <SkipForward size={28} />
                </Button>
                <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                  <Repeat size={20} />
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button variant="ghost" size="icon" onClick={() => setVolume(volume > 0 ? 0 : 0.5)} className="text-foreground/70 hover:text-foreground" aria-label={volume > 0 ? "Mutear" : "Desmutear"}>
                  {volume === 0 ? <VolumeX size={22}/> : <Volume2 size={22}/>}
                </Button>
                <Slider 
                  defaultValue={[0.5]} 
                  value={[volume]}
                  max={1} 
                  step={0.01} 
                  onValueChange={handleVolumeChange}
                  className="w-32"
                  aria-label="Volume"
                />
                {/* Future: Queue button <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground"><ListMusic size={22}/></Button> */}
              </div>
            </div>
          </Card>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
