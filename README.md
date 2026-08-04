# Presidential Youth Unity Cup (PYUC) 2026

A premium landing page for the **Presidential Youth Unity Cup (PYUC)**, the nationwide
football initiative of the Office of the Presidency uniting Nigeria's **six geo-political
zones** and the **FCT Abuja** through sport. Winners lift the **Golden Champion Trophy**,
with the Grand Final held at the **Eagle Stadium, Abuja**.

The Zones section features an interactive **map of Nigeria** (six zones + FCT) with a
toggle to the radial "Unity Constellation" view, and the Nigerian flag appears in the
navbar, hero and footer.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**,
**Framer Motion** and **lucide-react**. Colour system: the Nigerian flag (green & white)
plus a premium gold accent.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sections

- **Hero** — video-backed hero with live kick-off countdown
- **Mission** — the "why", with animated stat counters
- **The Zones** — interactive Unity Constellation: FCT at the centre, six zones orbiting
- **Format** — the five-stage road to glory
- **Bracket** — knockout tree (semi-finals → grand final + third-place play-off)
- **The Trophy** — the Golden Champion Trophy showcase
- **Fixtures** — sportsbook-style match centre
- **Gallery** — bento atmosphere grid
- **Register** — no-backend registration form
- **Trailer modal** — the hero "Watch The Trailer" and gallery play buttons open a video lightbox

## Language toggle

The 🌐 switcher in the navbar localises the site chrome (nav + hero) into **English,
Nigerian Pidgin, Hausa, Yorùbá and Igbo**; the choice persists in `localStorage`.

Translations live in [src/lib/i18n.tsx](src/lib/i18n.tsx) and are easy to extend to the
other sections. ⚠️ The Hausa / Yorùbá / Igbo / Pidgin copy is a best-effort starting point
— **have a native speaker review it before launch** on an official platform.

### Trailer video
Uses the Mixkit clip by default. To use a YouTube trailer instead, set `TRAILER_YT` to a
video ID in [src/components/TrailerModal.tsx](src/components/TrailerModal.tsx).

## Registration form (no backend / no database)

The form submits directly to **[Web3Forms](https://web3forms.com)** — a free service that
emails you each submission and stores them in a dashboard, so **no server or DB is needed**.

1. Get a free Access Key at <https://web3forms.com> (just enter your email).
2. `cp .env.local.example .env.local` and paste the key into `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. Restart the dev server.

Without a key the form runs in **demo mode** (shows success without sending).

### Other no-backend options
- **Netlify Forms** — zero-config if you deploy to Netlify (add `data-netlify="true"`).
- **Formspree / Getform / Basin** — same POST-to-endpoint model as Web3Forms.
- **Google Apps Script → Google Sheets** — free, submissions land in a spreadsheet.

## Customising

- **Zones, teams, fixtures, imagery** → `src/data/zones.ts`
- **Colours, fonts, animations** → `src/app/globals.css`
- **Copy** → the relevant component in `src/components/`

Replace the Unsplash/Mixkit placeholder media in `src/data/zones.ts` with your own official
photography and match footage before launch.
