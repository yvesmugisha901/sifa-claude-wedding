import { useMemo } from "react";
import { eventDayEnd, eventStart, formatDate, wedding, type WeddingEvent } from "../data/wedding";
import { computeCountdown, useCountdown } from "../hooks/useCountdown";

const pad = (n: number) => String(n).padStart(2, "0");

function Clock({ event }: { event: WeddingEvent }) {
  const start = useMemo(() => eventStart(event), [event]);
  const end = useMemo(() => eventDayEnd(event), [event]);
  const t = useCountdown(start, end);
  if (t.status === "today") return <p className="font-display text-4xl italic text-gold sm:text-5xl">Today is the day ❤️</p>;
  const units: [number, string][] = [[t.days, "days"], [t.hours, "hours"], [t.minutes, "minutes"], [t.seconds, "seconds"]];
  return (
    <div role="timer" aria-label={`${t.days} days until ${event.title}`} className="grid grid-cols-4 divide-x divide-gold/30">
      {units.map(([v, label]) => (
        <div key={label} className="px-1 sm:px-4">
          <div className="font-display text-5xl tabular-nums leading-none sm:text-7xl">{pad(v)}</div>
          <div className="mt-2 text-[.7rem] tracking-[.12em] text-ivory/60 sm:text-xs">{label}</div>
        </div>
      ))}
    </div>
  );
}

export function Countdown() {
  const events = wedding.events.filter((e) => e.countdown);
  const live = events.filter((e) => computeCountdown(eventStart(e), eventDayEnd(e)).status !== "past");
  const primary = live[0];
  const others = live.slice(1);
  return (
    <section id="countdown" aria-labelledby="cd-title" className="bg-ink px-5 py-16 text-center text-ivory sm:py-24">
      {primary ? (
        <>
          <h2 id="cd-title" className="font-display text-2xl italic text-gold sm:text-3xl">Until {primary.title}</h2>
          <p className="mt-1 text-sm text-ivory/70">{formatDate(primary)} · {primary.timeLabel}</p>
          <div className="mx-auto mt-10 max-w-2xl"><Clock event={primary} /></div>
          {others.map((e) => (
            <div key={e.type} className="mx-auto mt-16 max-w-xl border-t border-gold/20 pt-10">
              <p className="font-display text-xl italic text-gold">Then, {e.title} &amp; Reception</p>
              <p className="mb-6 mt-1 text-sm text-ivory/70">{formatDate(e)} · {e.timeLabel}</p>
              <div className="scale-90"><Clock event={e} /></div>
            </div>
          ))}
        </>
      ) : (
        <h2 id="cd-title" className="font-display text-4xl italic text-gold">Thank you for celebrating with us ❤️</h2>
      )}
    </section>
  );
}
