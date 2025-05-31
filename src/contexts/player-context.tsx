"use client";

import type { Track } from "@/types/music";
import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number; // 0 to 100
  duration: number; // in seconds
  playTrack: (track: Track, playlist?: Track[]) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void; // 0 to 1
  seek: (time: number) => void; // time in seconds
  nextTrack: () => void;
  prevTrack: () => void;
  currentPlaylist: Track[];
  isPlayerVisible: boolean;
  showPlayer: () => void;
  hidePlayer: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setProgress(audioRef.current ? (audioRef.current.currentTime / audioRef.current.duration) * 100 : 0);
      });
      audioRef.current.addEventListener('ended', () => {
        nextTrack();
      });
      audioRef.current.addEventListener('play', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('play', () => {});
        audioRef.current.removeEventListener('pause', () => {});
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volume]); // Re-create if volume changes to ensure event listeners are fresh or correctly bound

  const playTrack = (track: Track, playlist: Track[] = []) => {
    setCurrentTrack(track);
    setCurrentPlaylist(playlist.length > 0 ? playlist : [track]);
    if (audioRef.current && track.audioSrc) {
      audioRef.current.src = track.audioSrc;
      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      setIsPlaying(true);
      showPlayer();
    } else if (!track.audioSrc) {
        console.warn("Track has no audio source:", track.title);
        setIsPlaying(false); // Stop playback if no audio source
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioRef.current.src) { // only play if src is set
         audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      } else if (currentTrack.audioSrc) { // If src not set but track has it, set it and play
        audioRef.current.src = currentTrack.audioSrc;
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      }
    }
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolumeState(newVolume);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const findCurrentTrackIndex = useCallback(() => {
    if (!currentTrack || currentPlaylist.length === 0) return -1;
    return currentPlaylist.findIndex(t => t.id === currentTrack.id);
  }, [currentTrack, currentPlaylist]);

  const nextTrack = useCallback(() => {
    const currentIndex = findCurrentTrackIndex();
    if (currentIndex !== -1 && currentIndex < currentPlaylist.length - 1) {
      playTrack(currentPlaylist[currentIndex + 1], currentPlaylist);
    } else if (currentIndex === currentPlaylist.length -1 && currentPlaylist.length > 0) { // Loop to first track
      playTrack(currentPlaylist[0], currentPlaylist);
    }
  }, [findCurrentTrackIndex, currentPlaylist, playTrack]);

  const prevTrack = useCallback(() => {
    const currentIndex = findCurrentTrackIndex();
    if (currentIndex > 0) {
      playTrack(currentPlaylist[currentIndex - 1], currentPlaylist);
    } else if (currentIndex === 0 && currentPlaylist.length > 0) { // Loop to last track
       playTrack(currentPlaylist[currentPlaylist.length - 1], currentPlaylist);
    }
  }, [findCurrentTrackIndex, currentPlaylist, playTrack]);

  const showPlayer = () => setIsPlayerVisible(true);
  const hidePlayer = () => {
    setIsPlayerVisible(false);
    if (audioRef.current) {
        audioRef.current.pause();
    }
    setIsPlaying(false);
  }


  return (
    <PlayerContext.Provider value={{ 
        currentTrack, isPlaying, volume, progress, duration, 
        playTrack, togglePlayPause, setVolume, seek, nextTrack, prevTrack,
        currentPlaylist, isPlayerVisible, showPlayer, hidePlayer
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
