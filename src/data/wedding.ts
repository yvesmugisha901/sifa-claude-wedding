/** Single source of truth. Edit this file to change anything on the site. */
import extraPhotos from "./gallery.json";
export type EventType = "traditional" | "church" | "reception";

export interface WeddingEvent {
  type: EventType;
  title: string;
  subtitle: string;
  date: string; // YYYY-MM-DD (Kigali time)
  time: string; // 24h HH:mm (Kigali time)
  timeLabel: string;
  venue: string;
  location: string;
  description: string;
  mapQuery: string; // opens a Google Maps search; swap for a share link if you have one
  countdown: boolean;
}

export interface Photo { src: string; w: number; h: number; alt: string }

export const wedding = {
  timeZoneOffset: "+02:00", // Africa/Kigali, no daylight saving
  couple: { partner1: "Sifa", partner2: "Claude" },
  hosts: "The family of Jean Damascene Nyirineza and Vedaste Havugimana",
  verse: {
    text: "I will make you into a great nation, and I will bless you; I will make your name great, and you will be a blessing.",
    ref: "Genesis 12:2",
  },
  story: {
    heading: "Two hearts, one beautiful journey.",
    body: "Two families, one celebration. We are grateful to share these days with the people we love.",
  },
  hashtag: "", // e.g. "#SifaAndClaude" — hidden while empty
  hero: { src: "/images/couple-sofa.webp", w: 888, h: 1280, alt: "Sifa smiling up at Claude as they sit together beside a bouquet of red roses" } as Photo,
  storyPhotos: [
    { src: "/images/bouquet-bw.webp", w: 718, h: 1080, alt: "Claude holding a bouquet behind his back, hand in hand with Sifa" },
    { src: "/images/hands.webp", w: 718, h: 1080, alt: "Joined hands showing Sifa's engagement ring" },
  ] as Photo[],
   gallery: ([
    { src: "/images/couple-sofa.webp", w: 888, h: 1280, alt: "Sifa and Claude seated together beside a bouquet of red roses" },
    { src: "/images/hands.webp", w: 718, h: 1080, alt: "Joined hands showing Sifa's engagement ring and bracelet" },
    { src: "/images/bouquet-bw.webp", w: 718, h: 1080, alt: "Black and white photo of Claude holding a bouquet while holding Sifa's hand" },
  ] as Photo[]).concat(extraPhotos as Photo[]),
  music: { src: "/assets/music/wedding-song.mp3" },
  events: [
    {
      type: "traditional", title: "Gusaba no Gukwa", subtitle: "Introduction and dowry giving",
      date: "2026-10-31", time: "13:00", timeLabel: "1:00 PM",
      venue: "Scripture Union Rwanda (Ligue)", location: "KG5 Ave 67, Kigali",
      description: "The traditional Rwandan ceremony where our families meet and the dowry is presented.",
      mapQuery: "Scripture Union Rwanda Ligue KG 5 Ave 67 Kigali", countdown: true,
    },
    {
      type: "church", title: "Urusengero", subtitle: "Religious wedding ceremony",
      date: "2026-11-14", time: "13:00", timeLabel: "1:00 PM",
      venue: "EAR Kamembe", location: "Kamembe",
      description: "Join us at church as we exchange our vows before God and our families.",
      mapQuery: "EAR Kamembe Rwanda", countdown: true,
    },
    {
      type: "reception", title: "Reception", subtitle: "Celebration with family and friends",
      date: "2026-11-14", time: "16:00", timeLabel: "4:00 PM",
      venue: "Vive Hotel", location: "Near Lake Kivu",
      description: "Dinner, music and dancing to close the day together.",
      mapQuery: "Vive Hotel Lake Kivu Rwanda", countdown: false,
    },
  ] satisfies WeddingEvent[],
  contacts: [
    { name: "Sifa", numbers: ["0788878331", "0785579719", "0788898835"] },
    { name: "Claude", numbers: ["0788522188", "0788491560", "0783466025"] },
  ],
};

export const names = `${wedding.couple.partner1} & ${wedding.couple.partner2}`;
export const mapUrl = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const telHref = (n: string) => `tel:+25${n}`;
export const eventStart = (e: WeddingEvent) => new Date(`${e.date}T${e.time}:00${wedding.timeZoneOffset}`);
export const eventDayEnd = (e: WeddingEvent) => new Date(`${e.date}T23:59:59${wedding.timeZoneOffset}`);
export const formatDate = (e: WeddingEvent) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Kigali" }).format(eventStart(e));
