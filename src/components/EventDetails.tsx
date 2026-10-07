import { MapPin } from "lucide-react";
import { formatDate, mapUrl, wedding } from "../data/wedding";
import { Reveal } from "./Reveal";

export function EventDetails() {
  return (
    <section id="events" aria-labelledby="events-title" className="on-light bg-ivory px-5 py-20 sm:py-28">
      <h2 id="events-title" className="text-center font-display text-4xl sm:text-5xl">Ubukwe: the details</h2>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {wedding.events.map((e) => (
          <Reveal key={e.type}>
            <article className="flex h-full flex-col border border-gold-deep/30 p-7">
              <p className="text-sm text-gold-deep">{formatDate(e)}</p>
              <h3 className="mt-2 font-display text-3xl">{e.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{e.subtitle}</p>
              <dl className="mt-6 space-y-3 text-sm">
                <div><dt className="text-ink/60">Time</dt><dd className="text-base font-semibold">{e.timeLabel}</dd></div>
                <div><dt className="text-ink/60">Venue</dt><dd className="text-base font-semibold">{e.venue}</dd><dd className="text-ink/80">{e.location}</dd></div>
              </dl>
              <p className="mt-6 flex-1 text-sm leading-relaxed text-ink/80">{e.description}</p>
              <a href={mapUrl(e.mapQuery)} target="_blank" rel="noopener noreferrer"
                className="btn btn-line mt-8 text-gold-deep"><MapPin size={16} aria-hidden="true" />Open in Google Maps<span className="sr-only"> (opens in a new tab)</span></a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
