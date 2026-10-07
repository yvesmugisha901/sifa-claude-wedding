import { wedding } from "../data/wedding";
import { Ornament, Reveal } from "./Reveal";

export function CoupleStory() {
  const [big, small] = wedding.storyPhotos;
  const { story, verse } = wedding;
  return (
    <section id="story" aria-labelledby="story-title" className="bg-ink px-5 py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <Reveal className="relative pb-16 pr-12">
          {big && <img src={big.src} width={big.w} height={big.h} alt={big.alt} loading="lazy" className="h-auto w-full" />}
          {small && <img src={small.src} width={small.w} height={small.h} alt={small.alt} loading="lazy"
            className="absolute bottom-0 right-0 h-auto w-2/5 border-4 border-ink" />}
        </Reveal>
        <Reveal>
          <h2 id="story-title" className="font-display text-4xl italic leading-tight text-gold sm:text-5xl">{story.heading}</h2>
          <p className="mt-6 max-w-md leading-relaxed text-ivory/80">{story.body}</p>
          <Ornament className="mt-8 text-gold" />
          <figure className="mt-8 max-w-md">
            <blockquote className="font-display text-xl italic leading-relaxed">“{verse.text}”</blockquote>
            <figcaption className="mt-3 text-sm text-ivory/70">{verse.ref}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
