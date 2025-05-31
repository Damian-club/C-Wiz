"use client";

import { ArtistCard } from '@/components/music/artist-card';
import { AlbumCard } from '@/components/music/album-card';
import { PlaylistCard } from '@/components/music/playlist-card';
import { mockArtists, mockAlbums, mockPlaylists } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CreatePlaylistModal } from '@/components/music/create-playlist-modal';
import { useState } from 'react';

export default function HomePage() {
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-headline text-3xl font-semibold">Featured Artists</h2>
          {/* <Button variant="link" asChild><Link href="/artists">View All</Link></Button> */}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mockArtists.slice(0, 5).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-headline text-3xl font-semibold">New Albums</h2>
          {/* <Button variant="link" asChild><Link href="/albums">View All</Link></Button> */}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mockAlbums.slice(0, 5).map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-headline text-3xl font-semibold">Popular Playlists</h2>
          <Button onClick={() => setIsCreatePlaylistModalOpen(true)}>Create Playlist</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {mockPlaylists.slice(0, 5).map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>
      <CreatePlaylistModal isOpen={isCreatePlaylistModalOpen} onClose={() => setIsCreatePlaylistModalOpen(false)} />
    </div>
  );
}
