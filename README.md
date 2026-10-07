# Sifa & Claude — Wedding Invitation

Mobile-first digital invitation: opening screen, dual countdown (Kigali time), timeline, event details with Google Maps buttons, gallery with lightbox, optional music, WhatsApp sharing, contacts.

**Stack:** React 19, Vite, TypeScript (strict), Tailwind CSS 4, Lucide icons. No animation library (CSS only).

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Customize
Everything lives in `src/data/wedding.ts`: names, hosts, verse, story text, event dates/times (24h, Kigali), venues, map search text, phone numbers, hashtag (hidden while empty), photo list.
For a precise map pin, replace `mapQuery` text or change `mapUrl()` to use a Google Maps share link.

## Replace photos
Put images in `public/images/` (WebP or JPG, ~1200px wide is plenty) and update the paths, sizes and alt text in `wedding.ts`. Update `public/og.jpg` (1200×630) for WhatsApp/Facebook previews.

## Add music
Copy an MP3 you are licensed to use to `public/assets/music/wedding-song.mp3`. The Music button and "Open with music" appear automatically only when the file exists. Music never autoplays; it starts only after a tap.

## Deploy (Vercel)
Push to GitHub, import the repo in Vercel (Vite is auto-detected). Then in `index.html` replace `YOUR-DOMAIN.vercel.app` in the `og:image` / `twitter:image` tags with your real domain so link previews work.

## Structure
`src/components` (sections), `src/hooks` (countdown, music, reveal), `src/data/wedding.ts` (all content), `src/index.css` (design tokens).
