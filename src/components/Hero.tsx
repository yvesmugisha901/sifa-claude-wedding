import { ChevronDown } from "lucide-react";
import { wedding, formatDate } from "../data/wedding";

export function Hero() {
  const { hero, couple, events } = wedding;
  const [first, second] = [events[0]!, events[1]!];
  return (
    <header id="home" className="relative isolate min-h-svh bg-ink text-ivory lg:grid lg:grid-cols-2">
      <div className="absolute inset-0 lg:static lg:order-2">
        <img src={hero.src} width={hero.w} height={hero.h} alt={hero.alt} fetchPriority="high"
          className="h-full w-full object-cover object-[50%_55%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/5 to-ink/90 lg:hidden" />
      </div>
      <div className="relative z-10 flex min-h-svh flex-col items-center justify-between px-6 pb-12 pt-24 text-center lg:items-start lg:justify-center lg:gap-14 lg:px-20 lg:text-left">
        <div className="rise">
          <p className="text-sm text-ivory/80">With joy in our hearts</p>
          <h1 className="mt-3 font-display font-medium italic leading-[.95] text-gold">
            <span className="block text-7xl sm:text-8xl lg:text-9xl">{couple.partner1}</span>
            <span className="block text-4xl text-ivory/80 sm:text-5xl">&amp;</span>
            <span className="block text-7xl sm:text-8xl lg:text-9xl">{couple.partner2}</span>
          </h1>
          <p className="mt-4 text-sm text-ivory/80">are getting married</p>
        </div>
        <div>
          <p className="font-display text-xl leading-snug sm:text-2xl">
            {formatDate(first)}<br />{formatDate(second)}
          </p>
          <p className="mx-auto mt-3 max-w-xs text-xs text-ivory/70 lg:mx-0">{wedding.hosts} invite you to celebrate with them.</p>
          <a href="#countdown" aria-label="Scroll to countdown" className="mx-auto mt-6 grid size-11 place-items-center text-gold lg:mx-0"><ChevronDown /></a>
        </div>
      </div>
    </header>
  );
}
