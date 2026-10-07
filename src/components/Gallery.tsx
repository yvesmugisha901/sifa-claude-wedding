import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { wedding } from "../data/wedding";

const photos = wedding.gallery;

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
    <section id="gallery" aria-labelledby="gallery-title" className="on-light bg-paper px-3 py-20 sm:px-5 sm:py-28">
      <h2 id="gallery-title" className="text-center font-display text-4xl sm:text-5xl">Gallery</h2>
      <ul className="gallery mx-auto mt-12 flex max-w-6xl flex-wrap gap-1.5 after:grow-[10000] after:content-[''] md:gap-2">
        {photos.map((p, i) => {
          const ratio = p.w / p.h;
          return (
            <li key={p.src} className="relative overflow-hidden bg-ink/10"
              style={{ flexGrow: ratio * 100, flexBasis: `calc(var(--h) * ${ratio})` }}>
              <div style={{ paddingBottom: `${100 / ratio}%` }} />
              <button type="button" aria-label={`View photo ${i + 1} of ${photos.length}: ${p.alt}`}
                className="absolute inset-0 block h-full w-full"
                onClick={(e) => { last.current = e.currentTarget; setIndex(i); }}>
                <img src={p.src} width={p.w} height={p.h} alt="" loading="lazy" decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.03]" />
              </button>
            </li>
          );
        })}
      </ul>
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