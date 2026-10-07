import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { wedding } from "../data/wedding";
import { Reveal } from "./Reveal";

const photos = wedding.gallery;
const layout = ["col-span-2 md:col-span-1", "md:mt-20", "md:mt-8"];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);
  const last = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = dialog.current; if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const go = (step: number) => setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length));
  const close = () => { setIndex(null); last.current?.focus(); };
  const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };
  const current = index === null ? null : photos[index];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="on-light bg-paper px-5 py-20 sm:py-28">
      <h2 id="gallery-title" className="text-center font-display text-4xl sm:text-5xl">Gallery</h2>
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {photos.map((p, i) => (
          <Reveal key={p.src} className={layout[i % layout.length]}>
            <button type="button" aria-label={`View photo ${i + 1} of ${photos.length}: ${p.alt}`} className="block w-full overflow-hidden"
              onClick={(e) => { last.current = e.currentTarget; setIndex(i); }}>
              <img src={p.src} width={p.w} height={p.h} alt="" loading="lazy" style={{ aspectRatio: i === 0 ? "4 / 5" : `${p.w} / ${p.h}` }}
                className="w-full object-cover object-[50%_45%] transition-transform duration-[1200ms] hover:scale-[1.03]" />
            </button>
          </Reveal>
        ))}
      </div>
      <dialog ref={dialog} aria-label="Photo viewer" onClose={() => setIndex(null)} onKeyDown={onKey}
        onClick={(e) => { if (e.target === dialog.current) close(); }}
        onTouchStart={(e) => { touchX.current = e.touches[0]?.clientX ?? 0; }} onTouchEnd={onTouchEnd}
        className="m-0 h-svh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/95">
        {current && (
          <div className="flex h-full flex-col items-center justify-center px-4 text-ivory">
            <img src={current.src} alt={current.alt} className="max-h-[82svh] w-auto max-w-full object-contain" />
            <p className="mt-3 text-sm text-ivory/70">{(index ?? 0) + 1} / {photos.length}</p>
            <button type="button" aria-label="Close" onClick={close} className="absolute right-3 top-3 grid size-12 place-items-center"><X /></button>
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center"><ChevronLeft size={30} /></button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center"><ChevronRight size={30} /></button>
          </div>
        )}
      </dialog>
    </section>
  );
}
