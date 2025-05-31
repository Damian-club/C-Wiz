"use client";

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { mockArtists, mockAlbums, mockTracks } from '@/lib/mock-data';
import type { Artist, Album, Track } from '@/types/music';
import { ArtistCard } from '@/components/music/artist-card';
import { AlbumCard } from '@/components/music/album-card';
import { TrackItem } from '@/components/music/track-item';
import { usePlayer } from '@/contexts/player-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // Debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return { artists: [], albums: [], tracks: [] };
    }
    const lowerCaseQuery = debouncedQuery.toLowerCase();
    const artists = mockArtists.filter(artist =>
      artist.name.toLowerCase().includes(lowerCaseQuery)
    );
    const albums = mockAlbums.filter(album =>
      album.title.toLowerCase().includes(lowerCaseQuery) ||
      album.artist.toLowerCase().includes(lowerCaseQuery)
    );
    const tracks = mockTracks.filter(track =>
      track.title.toLowerCase().includes(lowerCaseQuery) ||
      track.artist.toLowerCase().includes(lowerCaseQuery) ||
      track.album.toLowerCase().includes(lowerCaseQuery)
    );
    return { artists, albums, tracks };
  }, [debouncedQuery]);

  const handlePlayTrack = (track: Track) => {
    playTrack(track, searchResults.tracks); // Play selected track within context of search results
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold mb-6">Search</h1>
        <Input
          type="search"
          placeholder="Search for artists, songs, or albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-lg p-4 rounded-lg"
        />
      </div>

      {debouncedQuery.trim() && (
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tracks">Tracks ({searchResults.tracks.length})</TabsTrigger>
            <TabsTrigger value="artists">Artists ({searchResults.artists.length})</TabsTrigger>
            <TabsTrigger value="albums">Albums ({searchResults.albums.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracks">
            {searchResults.tracks.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
                <div className="space-y-2 pr-4">
                  {searchResults.tracks.map((track, index) => (
                    <TrackItem 
                      key={track.id} 
                      track={track} 
                      onPlay={() => handlePlayTrack(track)}
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      isActive={currentTrack?.id === track.id}
                      index={index}
                    />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-muted-foreground text-center py-8">No tracks found for "{debouncedQuery}".</p>
            )}
          </TabsContent>

          <TabsContent value="artists">
            {searchResults.artists.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pr-4">
                  {searchResults.artists.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-muted-foreground text-center py-8">No artists found for "{debouncedQuery}".</p>
            )}
          </TabsContent>

          <TabsContent value="albums">
            {searchResults.albums.length > 0 ? (
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pr-4">
                  {searchResults.albums.map(album => <AlbumCard key={album.id} album={album} />)}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-muted-foreground text-center py-8">No albums found for "{debouncedQuery}".</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
