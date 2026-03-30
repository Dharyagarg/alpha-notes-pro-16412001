import { useState, useRef, useEffect, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, ListMusic, Shuffle, Repeat, Search, Download,
} from "lucide-react";
import { TRACKS, GENRES, type Track } from "@/lib/musicData";
import { saveFile } from "@/lib/downloadManager";
import { toast } from "sonner";

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
  const [genre, setGenre] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = TRACKS.filter((t) => {
    const matchGenre = genre === "All" || t.genre === genre;
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.artist.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  const track = TRACKS[currentIdx];

  const play = useCallback(() => { audioRef.current?.play(); setPlaying(true); }, []);
  const pause = useCallback(() => { audioRef.current?.pause(); setPlaying(false); }, []);

  const next = useCallback(() => {
    if (shuffle) {
      let r = Math.floor(Math.random() * TRACKS.length);
      while (r === currentIdx && TRACKS.length > 1) r = Math.floor(Math.random() * TRACKS.length);
      setCurrentIdx(r);
    } else {
      setCurrentIdx((i) => (i + 1) % TRACKS.length);
    }
  }, [currentIdx, shuffle]);

  const prev = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
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

  const handleDownload = async (t: Track) => {
    try {
      toast.loading("Downloading...", { id: `dl-${t.id}` });
      const res = await fetch(t.src);
      const blob = await res.blob();
      await saveFile({
        id: `music-${t.id}`,
        name: `${t.title} - ${t.artist}.mp3`,
        size: blob.size,
        type: "audio/mpeg",
        url: URL.createObjectURL(blob),
        downloadedAt: new Date().toISOString(),
        category: "music",
      });
      toast.success("Downloaded! Find it in Downloads.", { id: `dl-${t.id}` });
    } catch {
      toast.error("Download failed", { id: `dl-${t.id}` });
    }
  };

  return (
    <Layout>
      <audio ref={audioRef} preload="metadata" />
      <section className="section-padding min-h-screen">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Music2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Study Music</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Focus & Study Music</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Curated playlists to boost your concentration while studying.
            </p>
          </AnimatedSection>

          {/* Player */}
          <AnimatedSection delay={0.1} className="mb-8">
            <div className="glass-card gold-border-glow p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Album Art */}
                <motion.div
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 shrink-0"
                >
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                </motion.div>

                <div className="flex-1 w-full">
                  {/* Track Info */}
                  <div className="text-center sm:text-left mb-4">
                    <h2 className="text-xl font-bold mb-1">{track.title}</h2>
                    <p className="text-sm text-muted-foreground">{track.artist} · {track.genre}</p>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <Slider value={[progress]} max={duration || 1} step={1} onValueChange={seek} className="mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{fmt(progress)}</span>
                      <span>{fmt(duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Button variant="ghost" size="icon" onClick={() => setShuffle(!shuffle)} className={shuffle ? "text-primary" : "text-muted-foreground"}>
                      <Shuffle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={prev}><SkipBack className="w-5 h-5" /></Button>
                    <Button onClick={playing ? pause : play} className="w-14 h-14 rounded-full gold-gradient text-primary-foreground shadow-lg hover:shadow-primary/30">
                      {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={next}><SkipForward className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setRepeat(!repeat)} className={repeat ? "text-primary" : "text-muted-foreground"}>
                      <Repeat className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownload(track)} className="text-muted-foreground hover:text-primary">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center gap-3 max-w-xs mx-auto sm:mx-0">
                    <Button variant="ghost" size="icon" onClick={() => setMuted(!muted)} className="shrink-0">
                      {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <Slider value={[muted ? 0 : volume]} max={100} step={1} onValueChange={(v) => { setVolume(v[0]); setMuted(false); }} />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Search & Genre Filters */}
          <AnimatedSection delay={0.15} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search songs or artists..."
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {GENRES.map((g) => (
                  <Button
                    key={g}
                    variant={genre === g ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGenre(g)}
                    className={genre === g ? "gold-gradient text-primary-foreground" : ""}
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Playlist Grid */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <ListMusic className="w-4 h-4 text-primary" /> Playlist
                </h3>
                <span className="text-xs text-muted-foreground">{filtered.length} tracks</span>
              </div>
              {filtered.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No tracks found.</p>
              ) : (
                <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-1">
                  {filtered.map((t) => {
                    const globalIdx = TRACKS.findIndex((tr) => tr.id === t.id);
                    const isActive = globalIdx === currentIdx;
                    return (
                      <motion.div key={t.id} whileHover={{ x: 4 }} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive ? "bg-primary/15 border border-primary/30" : "hover:bg-secondary"}`}>
                        <button onClick={() => { setCurrentIdx(globalIdx); setPlaying(true); }} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                          <img src={t.cover} alt={t.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : ""}`}>{t.title}</p>
                            <p className="text-xs text-muted-foreground">{t.artist} · {t.genre}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{fmt(t.duration)}</span>
                          {isActive && playing && (
                            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </button>
                        <Button variant="ghost" size="icon" onClick={() => handleDownload(t)} className="shrink-0 text-muted-foreground hover:text-primary">
                          <Download className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default MusicPage;
