import { useEffect, useRef, useState } from "react";
import { names } from "../data/wedding";

interface Props { onOpen: (withMusic: boolean) => void; musicAvailable: boolean; open: boolean }

export function InvitationIntro({ onOpen, musicAvailable, open }: Props) {
  const btn = useRef<HTMLButtonElement>(null);
  const [gone, setGone] = useState(false);
  useEffect(() => { btn.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setGone(true), 1000);
    return () => window.clearTimeout(id);
  }, [open]);
  if (gone) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Wedding invitation"
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink px-6 text-center text-ivory ${open ? "intro-out" : ""}`}>
      <div className="rise max-w-md">
        <p className="font-display text-xl italic text-gold">MUHAWE IKAZE</p>
        <h1 className="mt-6 font-display text-5xl leading-tight sm:text-6xl">You are warmly invited</h1>
        <p className="mt-4 text-sm text-ivory/70">to the wedding of {names}</p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <button ref={btn} type="button" className="btn btn-gold" onClick={() => onOpen(false)}>Open invitation</button>
          {musicAvailable && (
            <button type="button" className="min-h-11 px-4 text-sm text-ivory/80 underline underline-offset-4 hover:text-gold" onClick={() => onOpen(true)}>
              Open with music
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
