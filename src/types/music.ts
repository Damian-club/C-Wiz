export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string; // e.g., "3:45"
  year: number;
  artwork?: string; // URL to album artwork
  audioSrc?: string; // URL to audio file
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: number;
  artwork: string; // URL to album artwork
  tracks: Track[];
};

export type Artist = {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // URL to artist image
  albums: Album[];
  topTracks: Track[];
};

export type Playlist = {
  id: string;
  name: string;
  description?: string;
  artwork?: string; // URL to playlist cover
  tracks: Track[];
  owner?: string; // User ID or name
};
