export interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  src: string;
  duration: number;
  genre: string;
}

export const GENRES = ["All", "Lofi", "Classical", "Ambient", "Jazz", "Electronic", "Piano", "Nature"] as const;

export const TRACKS: Track[] = [
  // Lofi
  { id: 1, title: "Lofi Study Beats", artist: "Alpha Vibes", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 372, genre: "Lofi" },
  { id: 2, title: "Chill Hop Morning", artist: "Study Cafe", cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 310, genre: "Lofi" },
  { id: 3, title: "Late Night Lofi", artist: "Midnight Beats", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 345, genre: "Lofi" },

  // Classical
  { id: 4, title: "Calm Piano Sessions", artist: "Study Mode", cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 305, genre: "Classical" },
  { id: 5, title: "Beethoven Study Mix", artist: "Classical Focus", cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 420, genre: "Classical" },
  { id: 6, title: "Mozart for Focus", artist: "Classical Minds", cover: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: 390, genre: "Classical" },

  // Ambient
  { id: 7, title: "Nature Ambience", artist: "Zen Study", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 284, genre: "Ambient" },
  { id: 8, title: "Ocean Waves Study", artist: "Deep Focus", cover: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: 360, genre: "Ambient" },
  { id: 9, title: "Rainy Day Focus", artist: "Ambient Lab", cover: "https://images.unsplash.com/photo-1501691223387-dd0500403074?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: 330, genre: "Ambient" },

  // Jazz
  { id: 10, title: "Midnight Jazz", artist: "Alpha Notes Radio", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 340, genre: "Jazz" },
  { id: 11, title: "Smooth Jazz Vibes", artist: "Jazz Lounge", cover: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: 295, genre: "Jazz" },
  { id: 12, title: "Coffee Shop Jazz", artist: "Study Jazz", cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: 315, genre: "Jazz" },

  // Electronic
  { id: 13, title: "Focus Flow", artist: "Deep Concentration", cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 398, genre: "Electronic" },
  { id: 14, title: "Synthwave Study", artist: "Neon Focus", cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: 355, genre: "Electronic" },
  { id: 15, title: "Deep Focus Beats", artist: "Electronic Mind", cover: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: 380, genre: "Electronic" },

  // Piano
  { id: 16, title: "Soft Piano Melodies", artist: "Piano Dreams", cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: 275, genre: "Piano" },
  { id: 17, title: "Relaxing Keys", artist: "Study Keys", cover: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3", duration: 320, genre: "Piano" },

  // Nature
  { id: 18, title: "Forest Morning", artist: "Nature Sounds", cover: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 400, genre: "Nature" },
  { id: 19, title: "River Stream Focus", artist: "Calm Nature", cover: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 365, genre: "Nature" },
  { id: 20, title: "Thunderstorm Study", artist: "Storm Sounds", cover: "https://images.unsplash.com/photo-1429552077091-836152271555?w=300&h=300&fit=crop", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 410, genre: "Nature" },
];
