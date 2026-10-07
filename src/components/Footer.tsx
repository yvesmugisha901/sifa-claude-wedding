import { Phone } from "lucide-react";
import { names, telHref, wedding } from "../data/wedding";
import { Ornament, Reveal } from "./Reveal";
import { ShareButton } from "./ShareButton";

export function Footer() {
  return (
    <>
      <section id="contact" aria-labelledby="contact-title" className="on-light bg-ivory px-5 py-20 text-center sm:py-24">
        <h2 id="contact-title" className="font-display text-4xl sm:text-5xl">Contact us</h2>
        <p className="mt-3 text-ink/70">Your presence will be highly appreciated.</p>
        <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-6">
          {wedding.contacts.map((c) => (
            <div key={c.name} className="border-t border-gold-deep/40 pt-4">
              <h3 className="font-display text-2xl">{c.name}</h3>
              <ul className="mt-2">
                {c.numbers.map((n) => (
                  <li key={n}><a href={telHref(n)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-gold-deep">
                    <Phone size={14} aria-hidden="true" />{n}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-ink px-5 py-20 text-center text-ivory">
        <Reveal>
          <Ornament className="mx-auto text-gold" />
          <p className="mt-8 text-sm text-ivory/70">With love,</p>
          <p className="mt-2 font-display text-5xl italic text-gold">{names}</p>
          {wedding.hashtag && <p className="mt-4 text-sm">{wedding.hashtag}</p>}
          <div className="mt-10"><ShareButton /></div>
          <p className="mt-12 text-xs text-ivory/60">{wedding.hosts} · 2026 ❤️</p>
        </Reveal>
      </footer>
    </>
  );
}
