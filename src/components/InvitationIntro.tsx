import { useEffect, useRef, useState } from "react";
import { wedding } from "../data/wedding";

interface Props { onOpen: (withMusic: boolean) => void; musicAvailable: boolean; open: boolean }

export function InvitationIntro({ onOpen, musicAvailable, open }: Props) {
  const btn = useRef<HTMLButtonElement>(null);
  const [gone, setGone] = useState(false);
  const { hero, couple } = wedding;

  useEffect(() => { btn.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setGone(true), 1000);
    return () => window.clearTimeout(id);
  }, [open]);
  if (gone) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Wedding invitation"
      className={`fixed inset-0 z-[60] overflow-hidden bg-ink text-ivory lg:grid lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)] ${open ? "intro-out" : ""}`}>
      <div className="absolute inset-0 lg:relative lg:order-2 lg:min-h-0">
        <img src={hero.src} width={hero.w} height={hero.h} alt={hero.alt} fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[50%_58%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/0 to-ink/95 lg:hidden" />
      </div>

      <div className="rise relative z-10 flex h-full min-h-0 flex-col items-center justify-between overflow-y-auto px-6 pb-10 pt-12 text-center lg:items-start lg:justify-center lg:gap-6 lg:px-16 lg:py-8 lg:text-left">
        <div>
          <p className="font-display text-2xl italic text-gold">Murahawe ikaze</p>
          <p className="mt-2 text-sm text-ivory/85">You are warmly invited to the wedding of</p>
        </div>

        <div className="w-full">
          <h1 className="font-display font-bold italic leading-none text-gold [text-shadow:0_2px_24px_rgba(0,0,0,.6)]">
            <span className="block whitespace-nowrap text-[clamp(2.75rem,14vw,7rem)] lg:text-[clamp(3.5rem,6vw,6.5rem)]">
              {couple.partner1} <span className="text-ivory">&amp;</span> {couple.partner2}
            </span>
          </h1>
          <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
            <button ref={btn} type="button" className="btn btn-gold min-h-14 px-10 text-sm" onClick={() => onOpen(false)}>Open invitation</button>
            {musicAvailable && (
              <button type="button" className="min-h-11 px-4 text-sm text-ivory/85 underline underline-offset-4 hover:text-gold" onClick={() => onOpen(true)}>
                Open with music
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );}