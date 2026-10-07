import { formatDate, wedding } from "../data/wedding";
import { Ornament, Reveal } from "./Reveal";

export function EventTimeline() {
  return (
    <section aria-labelledby="journey" className="on-light bg-paper px-5 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 id="journey" className="font-display text-4xl sm:text-5xl">Our journey to marriage</h2>
        <Ornament className="mx-auto mt-5 text-gold-deep" />
      </Reveal>
      <ol className="relative mx-auto mt-14 max-w-xl border-l border-gold-deep/40 pl-8">
        {wedding.events.map((e) => (
          <li key={e.type} className="relative pb-12 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[2.45rem] top-2 size-3 rounded-full border border-gold-deep bg-paper" />
            <Reveal>
              <p className="text-sm text-gold-deep">{formatDate(e)} · {e.timeLabel}</p>
              <h3 className="mt-1 font-display text-3xl">{e.title}</h3>
              <p className="mt-1 text-ink/70">{e.subtitle}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
