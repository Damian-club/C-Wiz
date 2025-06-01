import type { Artist, Album, Track, Playlist } from '@/types/music';

export const mockTracks: Track[] = [
  { id: 't1', title: 'Caribbean Girl', artist: 'Diego Ortiz', album: 'Caribe', duration: '1:42', year: 2025, artwork: '/images/t1.png', audioSrc: '/audio/t1.mp3' },
  { id: 't2', title: 'Explicaciones', artist: 'Diego Ortiz', album: 'Caribe', duration: '3:18', year: 2025, artwork: '/images/t2.png', audioSrc: '/audio/t2.mp3' },
  { id: 't3', title: 'Mamasita', artist: 'Diego Ortiz', album: 'Caribe', duration: '3:30', year: 2025, artwork: '/images/t3.png', audioSrc: '/audio/t3.mp3' },
  { id: 't4', title: 'R.I.D.U.A.E', artist: 'DARCAM', album: 'Caribe', duration: '2:42', year: 2025, artwork: '/images/t4.png', audioSrc: '/audio/t4.mp3' },
  { id: 't5', title: 'Cyberpunk', artist: 'Santiago y Diego', album: 'Colab', duration: '1:17', year: 2025, artwork: '/images/t5.png', audioSrc: '/audio/t5.mp3' },
  { id: 't6', title: 'Mr Trance', artist: 'Santiago y Diego', album: 'Colab', duration: '1:12', year: 2025, artwork: '/images/t6.png', audioSrc: '/audio/t6.mp3' },
  { id: 't7', title: 'Coño', artist: 'Coffe', album: 'Mou5ing EP', duration: '1:46', year: 2025, artwork: '/images/t7.png', audioSrc: '/audio/t7.mp3' },
  { id: 't8', title: 'Mou5ing', artist: 'Coffe', album: 'Mou5ing EP', duration: '2:41', year: 2025, artwork: '/images/t8.png', audioSrc: '/audio/t8.mp3' },
  { id: 't9', title: 'Boomshakalaka', artist: 'Diego Ortiz', album: 'No limitz', duration: '2:01', year: 2025, artwork: '/images/t9.png', audioSrc: '/audio/t9.mp3' },
  { id: 't10', title: 'Celtic Goblin', artist: 'Diego Ortiz', album: 'No limitz', duration: '2:44', year: 2025, artwork: '/images/t10.png', audioSrc: '/audio/t10.mp3' },
  { id: 't11', title: 'Me gustó', artist: 'Diego Ortiz', album: 'No limitz', duration: '3:42', year: 2025, artwork: '/images/t11.png', audioSrc: '/audio/t11.mp3' },
  { id: 't12', title: 'Mj Hee Hee', artist: 'Diego Ortiz', album: 'No limitz', duration: '3:40', year: 2025, artwork: '/images/t12.png', audioSrc: '/audio/t12.mp3' },
  { id: 't13', title: 'Para Freestyle', artist: 'Diego Ortiz', album: 'No limitz', duration: '4:37', year: 2025, artwork: '/images/t13.png', audioSrc: '/audio/t13.mp3' },
  { id: 't14', title: 'Mid Tempo', artist: 'Diego Ortiz', album: 'Out of this world', duration: '5:29', year: 2025, artwork: '/images/t14.png', audioSrc: '/audio/t14.mp3' },
  { id: 't15', title: 'Trappp', artist: 'Diego Ortiz', album: 'Out of this world', duration: '2:28', year: 2025, artwork: '/images/t15.png', audioSrc: '/audio/t15.mp3' },
  { id: 't16', title: 'Intermisión (Cover Piano)', artist: 'Santiago G', album: 'Colecciones', duration: '1:21', year: 2025, artwork: '/images/t16.png', audioSrc: '/audio/t16.mp3' },
  { id: 't17', title: 'Jazzy Hall', artist: 'Santiago G', album: 'Colecciones', duration: '1:40', year: 2025, artwork: '/images/t17.png', audioSrc: '/audio/t17.mp3' },
  { id: 't18', title: 'Overture', artist: 'Santiago G', album: 'Colecciones', duration: '1:47', year: 2025, artwork: '/images/t18.png', audioSrc: '/audio/t18.mp3' },
  { id: 't19', title: 'Rises the moon (Instrumental)', artist: 'Liana Flores', album: 'Colecciones', duration: '2:45', year: 2025, artwork: '/images/t19.png', audioSrc: '/audio/t19.mp3' },
  { id: 't20', title: 'Simple Waltz', artist: 'Santiago G', album: 'Colecciones', duration: '0:35', year: 2025, artwork: '/images/t20.png', audioSrc: '/audio/t20.mp3' },
  { id: 't21', title: 'Circus Game', artist: 'Santiago G', album: 'Colecciones', duration: '1:21', year: 2025, artwork: '/images/t21.png', audioSrc: '/audio/t21.mp3' },
  { id: 't22', title: 'Awesome Tanks', artist: 'Santiago G', album: 'Colecciones', duration: '1:07', year: 2025, artwork: '/images/t22.png', audioSrc: '/audio/t22.mp3' },
  { id: 't23', title: 'Salchichón', artist: 'Pou', album: 'Si me lo permite', duration: '1:08', year: 2025, artwork: '/images/t23.png', audioSrc: '/audio/t23.mp3' },
  { id: 't24', title: 'Wuup', artist: 'SG90', album: 'Si me lo permite', duration: '3:34', year: 2025, artwork: '/images/t24.png', audioSrc: '/audio/t24.mp3' },
  { id: 't25', title: 'Final Dramático (¿?)', artist: 'Santiago G', album: 'Colecciones', duration: '1:46', year: 2025, artwork: '/images/t25.png', audioSrc: '/audio/t25.mp3' }
];

export const mockAlbums: Album[] = [
  { id: 'a1', title: 'Caribe', artist: 'Diego Ortiz', year: 2025,
    artwork: '/images/a1.png',
    dataAiHint: 'chill island',
    tracks: [mockTracks[0], mockTracks[1], mockTracks[2], mockTracks[3]] },
  { id: 'a2', title: 'Colab', artist: 'Santiago y Diego', year: 2025,
    artwork: '/images/a2.png',
    dataAiHint: 'chill electronic',
    tracks: [mockTracks[4], mockTracks[5]] },
  { id: 'a3', title: 'Mou5ing EP', artist: 'Diego Ortiz', year: 2025,
    artwork: '/images/a3.png',
    dataAiHint: 'hard electronic',
    tracks: [mockTracks[6], mockTracks[7]] },
  { id: 'a4', title: 'No limitz', artist: 'Diego Ortiz', year: 2025,
    artwork: '/images/a4.png',
    dataAiHint: 'house and chill',
    tracks: [mockTracks[8], mockTracks[9], mockTracks[10], mockTracks[11], mockTracks[12]] },
  { id: 'a5', title: 'Out of this world', artist: 'Diego Ortiz', year: 2025,
    artwork: '/images/a5.png',
    dataAiHint: 'hardcore electronic',
    tracks: [mockTracks[13], mockTracks[14]] },
  { id: 'a6', title: 'Colecciones', artist: 'Santiago G', year: 2025,
    artwork: '/images/a6.png',
    dataAiHint: 'instrumental and classical',
    tracks: [mockTracks[15], mockTracks[16], mockTracks[17], mockTracks[18], mockTracks[19], mockTracks[20], mockTracks[21], mockTracks[24] },
  { id: 'a7', title: 'Si me lo permite', artist: 'John Salchichón', year: 2025,
    artwork: '/images/a7.png',
    dataAiHint: 'comedy',
    tracks: [mockTracks[22], mockTracks[23]] },
];

export const mockArtists: Artist[] = [
  
];

export const mockPlaylists: Playlist[] = [
 
];

// Helper functions to get mock data by ID
export const getArtistById = (id: string): Artist | undefined => mockArtists.find(artist => artist.id === id);
export const getAlbumById = (id: string): Album | undefined => mockAlbums.find(album => album.id === id);
export const getPlaylistById = (id: string): Playlist | undefined => mockPlaylists.find(playlist => playlist.id === id);
export const getTrackById = (id: string): Track | undefined => mockTracks.find(track => track.id === id);
