import type { Artist, Album, Track, Playlist } from '@/types/music';

export const mockTracks: Track[] = [
  { id: 't1', title: 'Sunset Groove', artist: 'Cosmic Voyager', album: 'Galaxy Tunes', duration: '3:45', year: 2023, artwork: 'https://placehold.co/300x300/3bd047/0a0a0a.png?text=SG', audioSrc: '/audio/sample1.mp3' },
  { id: 't2', title: 'Midnight Drive', artist: 'Night Rider', album: 'City Lights', duration: '4:12', year: 2022, artwork: 'https://placehold.co/300x300/151948/fcfcfc.png?text=MD', audioSrc: '/audio/sample2.mp3' },
  { id: 't3', title: 'Ocean Whisper', artist: 'Aqua Marine', album: 'Deep Blue', duration: '2:58', year: 2024, artwork: 'https://placehold.co/300x300/87CEEB/0a0a0a.png?text=OW', audioSrc: '/audio/sample3.mp3' },
  { id: 't4', title: 'Desert Mirage', artist: 'Sandstorm', album: 'Nomad Soul', duration: '5:03', year: 2021, artwork: 'https://placehold.co/300x300/F4A460/0a0a0a.png?text=DM' },
  { id: 't5', title: 'Forest Echoes', artist: 'Greenleaf', album: 'Ancient Woods', duration: '3:30', year: 2023, artwork: 'https://placehold.co/300x300/228B22/fcfcfc.png?text=FE' },
  { id: 't6', title: 'Starfall', artist: 'Cosmic Voyager', album: 'Galaxy Tunes', duration: '4:20', year: 2023, artwork: 'https://placehold.co/300x300/3bd047/0a0a0a.png?text=SF' },
  { id: 't7', title: 'Neon Dreams', artist: 'Night Rider', album: 'City Lights', duration: '3:55', year: 2022, artwork: 'https://placehold.co/300x300/151948/fcfcfc.png?text=ND' },
  { id: 't8', title: 'Coral Dance', artist: 'Aqua Marine', album: 'Deep Blue', duration: '3:15', year: 2024, artwork: 'https://placehold.co/300x300/87CEEB/0a0a0a.png?text=CD' },
];

export const mockAlbums: Album[] = [
  { 
    id: 'a1', 
    title: 'Galaxy Tunes', 
    artist: 'Cosmic Voyager', 
    year: 2023, 
    artwork: 'https://placehold.co/400x400/3bd047/0a0a0a.png?text=GT',
    dataAiHint: 'abstract galaxy',
    tracks: [mockTracks[0], mockTracks[5]] 
  },
  { 
    id: 'a2', 
    title: 'City Lights', 
    artist: 'Night Rider', 
    year: 2022, 
    artwork: 'https://placehold.co/400x400/151948/fcfcfc.png?text=CL',
    dataAiHint: 'city night',
    tracks: [mockTracks[1], mockTracks[6]] 
  },
  { 
    id: 'a3', 
    title: 'Deep Blue', 
    artist: 'Aqua Marine', 
    year: 2024, 
    artwork: 'https://placehold.co/400x400/87CEEB/0a0a0a.png?text=DB',
    dataAiHint: 'ocean underwater',
    tracks: [mockTracks[2], mockTracks[7]] 
  },
];

export const mockArtists: Artist[] = [
  { 
    id: 'ar1', 
    name: 'Cosmic Voyager', 
    description: 'Exploring the universe through sound, Cosmic Voyager blends electronic beats with ethereal melodies to take you on an interstellar journey.',
    imageUrl: 'https://placehold.co/400x400/3bd047/0a0a0a.png?text=CV',
    dataAiHint: 'musician portrait',
    albums: [mockAlbums[0]],
    topTracks: [mockTracks[0], mockTracks[5]]
  },
  { 
    id: 'ar2', 
    name: 'Night Rider', 
    description: 'Cruising through the neon-lit streets, Night Rider captures the essence of urban nightlife with synth-heavy tracks and driving rhythms.',
    imageUrl: 'https://placehold.co/400x400/151948/fcfcfc.png?text=NR',
    dataAiHint: 'dj music',
    albums: [mockAlbums[1]],
    topTracks: [mockTracks[1], mockTracks[6]]
  },
  { 
    id: 'ar3', 
    name: 'Aqua Marine', 
    description: 'Dive into the depths of sound with Aqua Marine. Soothing ambient soundscapes meet gentle percussions, inspired by the mysteries of the ocean.',
    imageUrl: 'https://placehold.co/400x400/87CEEB/0a0a0a.png?text=AM',
    dataAiHint: 'singer nature',
    albums: [mockAlbums[2]],
    topTracks: [mockTracks[2], mockTracks[7]]
  },
];

export const mockPlaylists: Playlist[] = [
  { 
    id: 'p1', 
    name: 'Chill Vibes', 
    description: 'Relax and unwind with these soothing tracks.',
    artwork: 'https://placehold.co/300x300/cccccc/0a0a0a.png?text=CV',
    dataAiHint: 'relaxing beach',
    tracks: [mockTracks[0], mockTracks[2], mockTracks[4]] 
  },
  { 
    id: 'p2', 
    name: 'Workout Beats', 
    description: 'Get energized with these upbeat anthems.',
    artwork: 'https://placehold.co/300x300/ff4500/fcfcfc.png?text=WB',
    dataAiHint: 'gym fitness',
    tracks: [mockTracks[1], mockTracks[3], mockTracks[6]] 
  },
  {
    id: 'p3',
    name: 'Late Night Drive',
    description: 'Perfect soundtrack for a drive under the stars.',
    artwork: 'https://placehold.co/300x300/4b0082/fcfcfc.png?text=LND',
    dataAiHint: 'night road',
    tracks: [mockTracks[1], mockTracks[6], mockTracks[5]]
  }
];

// Helper functions to get mock data by ID
export const getArtistById = (id: string): Artist | undefined => mockArtists.find(artist => artist.id === id);
export const getAlbumById = (id: string): Album | undefined => mockAlbums.find(album => album.id === id);
export const getPlaylistById = (id: string): Playlist | undefined => mockPlaylists.find(playlist => playlist.id === id);
export const getTrackById = (id: string): Track | undefined => mockTracks.find(track => track.id === id);
