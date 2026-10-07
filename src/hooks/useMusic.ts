import { useCallback, useEffect, useRef, useState } from "react";

const KEY = "wedding-music";
const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const write = (v: string) => { try { localStorage.setItem(KEY, v); } catch { /* storage unavailable */ } };

export function useMusic(src: string) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((r) => { if (!cancelled && r.ok && (r.headers.get("content-type") ?? "").startsWith("audio")) setAvailable(true); })
      .catch(() => undefined);
    const a = new Audio(src);
    a.loop = true; a.preload = "none";
    a.onplay = () => setPlaying(true);
    a.onpause = () => setPlaying(false);
    audio.current = a;
    return () => { cancelled = true; a.pause(); audio.current = null; };
  }, [src]);

  const play = useCallback(() => { audio.current?.play().catch(() => setPlaying(false)); write("on"); }, []);
  const toggle = useCallback(() => {
    const a = audio.current; if (!a) return;
    if (a.paused) play(); else { a.pause(); write("off"); }
  }, [play]);
  const wasOn = useCallback(() => read() === "on", []);

  return { available, playing, play, toggle, wasOn };
}
