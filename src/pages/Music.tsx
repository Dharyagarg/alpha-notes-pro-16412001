import { useState, useRef, useEffect, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, ListMusic, Shuffle, Repeat,
} from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  src: string;
  duration: number;
}

const SAMPLE_TRACKS: Track[] = [
  {
    id: 1, title: "Lofi Study Beats", artist: "Alpha Vibes",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 372,
  },
  {
    id: 2, title: "Focus Flow", artist: "Deep Concentration",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 398,
  },
  {
    id: 3, title: "Calm Piano Sessions", artist: "Study Mode",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&h=300&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 305,
  },
  {
    id: 4, title: "Nature Ambience", artist: "Zen Study",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 284,
  },
  {
    id: 5, title: "Midnight Jazz", artist: "Alpha Notes Radio",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 340,
  },
];

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const MusicPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);

  const track = SAMPLE_TRACKS[currentIdx];

  const play = useCallback(() => { audioRef.current?.play(); setPlaying(true); }, []);
  const pause = useCallback(() => { audioRef.current?.pause(); setPlaying(false); }, []);

  const next = useCallback(() => {
    if (shuffle) {
      let r = Math.floor(Math.random() * SAMPLE_TRACKS.length);
      while (r === currentIdx && SAMPLE_TRACKS.length > 1) r = Math.floor(Math.random() * SAMPLE_TRACKS.length);
      setCurrentIdx(r);
    } else {
      setCurrentIdx((i) => (i + 1) % SAMPLE_TRACKS.length);
    }
  }, [currentIdx, shuffle]);

  const prev = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentIdx((i) => (i - 1 + SAMPLE_TRACKS.length) % SAMPLE_TRACKS.length);
    }
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = track.src;
    if (playing) a.play().catch(() => {});
  }, [currentIdx]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = muted ? 0 : volume / 100;
  }, [volume, muted]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const update = () => { setProgress(a.currentTime); setDuration(a.duration || 0); };
    const ended = () => { if (repeat) { a.currentTime = 0; a.play(); } else next(); };
    a.addEventListener("timeupdate", update);
    a.addEventListener("ended", ended);
    return () => { a.removeEventListener("timeupdate", update); a.removeEventListener("ended", ended); };
  }, [next, repeat]);

  const seek = (val: number[]) => {
    if (audioRef.current) audioRef.current.currentTime = val[0];
  };

  return (
    <Layout>
      <audio ref={audioRef} preload="metadata" />
      <section className="section-padding min-h-screen">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Music2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Study Music</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Focus & Study Music</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Curated playlists to boost your concentration while studying.
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Player */}
            <AnimatedSection delay={0.1} className="lg:col-span-3">
              <div className="glass-card gold-border-glow p-6 sm:p-8">
                {/* Album Art */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    animate={{ rotate: playing ? 360 : 0 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20"
                  >
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                  </motion.div>
                </div>

                {/* Track Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-1">{track.title}</h2>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <Slider
                    value={[progress]}
                    max={duration || 1}
                    step={1}
                    onValueChange={seek}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{fmt(progress)}</span>
                    <span>{fmt(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Button variant="ghost" size="icon" onClick={() => setShuffle(!shuffle)}
                    className={shuffle ? "text-primary" : "text-muted-foreground"}>
                    <Shuffle className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={prev}>
                    <SkipBack className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={playing ? pause : play}
                    className="w-14 h-14 rounded-full gold-gradient text-primary-foreground shadow-lg hover:shadow-primary/30"
                  >
                    {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={next}>
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setRepeat(!repeat)}
                    className={repeat ? "text-primary" : "text-muted-foreground"}>
                    <Repeat className="w-4 h-4" />
                  </Button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3 max-w-xs mx-auto">
                  <Button variant="ghost" size="icon" onClick={() => setMuted(!muted)} className="shrink-0">
                    {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Slider value={[muted ? 0 : volume]} max={100} step={1} onValueChange={(v) => { setVolume(v[0]); setMuted(false); }} />
                </div>
              </div>
            </AnimatedSection>

            {/* Playlist */}
            <AnimatedSection delay={0.2} className="lg:col-span-2">
              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ListMusic className="w-4 h-4 text-primary" /> Playlist
                  </h3>
                  <span className="text-xs text-muted-foreground">{SAMPLE_TRACKS.length} tracks</span>
                </div>
                <div className="space-y-1">
                  {SAMPLE_TRACKS.map((t, i) => (
                    <motion.button
                      key={t.id}
                      whileHover={{ x: 4 }}
                      onClick={() => { setCurrentIdx(i); setPlaying(true); }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                        i === currentIdx ? "bg-primary/15 border border-primary/30" : "hover:bg-secondary"
                      }`}
                    >
                      <img src={t.cover} alt={t.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${i === currentIdx ? "text-primary" : ""}`}>
                          {t.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{t.artist}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{fmt(t.duration)}</span>
                      {i === currentIdx && playing && (
                        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                          className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MusicPage;
