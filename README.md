# Apex Mechanical & Plumbing Solutions

A static, multi-page marketing site for a fictional premium regional plumbing corporation.
Built with hand-written HTML/CSS, a small Node build step for shared chrome, and no runtime
dependencies.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | `index.html` | Cinematic hero, live dispatch card, four premium service tiers with starting rates |
| Residential | `residential.html` | Water heaters, repipes, drains, main line, leaks, fixtures |
| Commercial | `commercial.html` | Property types, capabilities, SLA table, maintenance program |
| Pricing | `pricing.html` | Published starting rates, fees, protection plans |
| Schedule | `schedule.html` | "Schedule an Inspection Window" + calendar embed placeholder |
| About | `about.html` | Background, image grid, licensing/insurance, ZIP coverage, guarantee seal |
| Emergency | `emergency.html` | 24/7 dispatch, first steps, triage, emergency pricing |
| Service Areas | `service-areas.html` | City cards, full ZIP grid, response standards |
| Reviews | `reviews.html` | Aggregate rating, testimonials, category scores, review policy |
| Careers | `careers.html` | Open roles, apprentice track, benefits |
| Contact | `contact.html` | Contact cards, demo request form, hours, map placeholder |
| Site Map | `sitemap.html` | Human-readable architecture map |
| Privacy / Terms / Accessibility | `privacy.html`, `terms.html`, `accessibility.html` | Compliance content |

## Structure

```
.
├── assets/
│   ├── favicon.svg
│   ├── site.css        # Design system: tokens, masthead, cards, footer, responsive
│   └── site.js         # Mobile nav, sticky shadow, year stamp, demo form guard
├── src/pages/*.html    # Page bodies (no header/footer duplication)
├── build.mjs           # Assembles pages, sitemap.xml, robots.txt
├── index.html …        # Generated output — do not edit directly
└── sitemap.xml
```

The shared masthead (utility bar + emergency banner + sticky header) and the four-column
footer live in `build.mjs`, so a change to the phone number or navigation happens in one place.
The active nav state is derived from each page's `nav` key.

## Build

No dependencies are required.

```bash
node build.mjs
```

Regenerates every `.html` file at the project root, plus `sitemap.xml` and `robots.txt`.
Edit files in `src/pages/`, never the generated pages.

## Preview

```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

Then open `http://localhost:3000`. The site is fully static and can be hosted on any CDN or
static host (Cloudflare Pages, Netlify, S3, Nginx).

## Design system

- Deep navy `#0B2545` (plus `#061A32`, `#143A66`) for authority and structure
- Amber `#EE964B` reserved for emergency dispatch, the primary appointment CTA, and small
  focal accents — never for body text or decorative fills
- White and `#F5F8FC` for generous negative space
- Display type: Instrument Serif; UI type: Inter (Google Fonts, with system fallbacks)
- Motion is limited to hover/focus transitions and one slow neon glow on the emergency
  banner, disabled under `prefers-reduced-motion`

## Placeholders to replace before publication

| Item | Current placeholder | Where |
| --- | --- | --- |
| Phone number | `(555) 014-7700` | `build.mjs` (`SITE.phoneDisplay` / `SITE.phoneHref`) and page copy |
| Email addresses | `dispatch@apexmechanical.example` | `build.mjs`, contact, legal pages |
| Street address | `1420 Foundry Row, Suite 300, Raleigh, NC 27601` | `build.mjs`, contact page |
| License numbers | `NC Plumbing License #P-000000`, `NC Mechanical #M-000000` | `build.mjs`, `about.html` |
| Insurance limits | `$2,000,000` / `$1,000,000` | `about.html`, footer disclosure |
| Domain | `https://www.apexmechanical.example` | `build.mjs` (canonical + sitemap) |
| Stats, review counts, ratings | 18 years, 24,000 jobs, 4.9 / 1,238 reviews | Home, about, reviews |
| Plan pricing | `$14` / `$29` per month | `pricing.html` |
| Calendar module | Empty embed zone | `schedule.html` (`#scheduling-calendar`) |
| Map | Static SVG illustration | `contact.html` |

The phone number appears in the header, footer, CTA bands and body copy. A global
find-and-replace of `(555) 014-7700` and `+15550147700` plus the `SITE` object in
`build.mjs` is the complete replacement path.

## Calendar embed

`schedule.html` contains a reserved `.embed-slot` block with `id="scheduling-calendar"`.
Paste the scheduling provider's iframe or script inside that container. The surrounding
layout is already sized for a full calendar module (600px minimum height on desktop,
440px on mobile). Before choosing a provider, confirm:

- WCAG 2.1 AA conformance statement
- Mobile reflow at 320px
- A phone fallback that is always visible
- Data-processing terms compatible with the privacy policy

## Accessibility notes

- Skip link, semantic landmarks, single H1 per page
- Keyboard-operable navigation with Escape-to-close and focus-visible styling
- Emergency banner glow disabled under `prefers-reduced-motion`
- Form fields labelled; the contact form is a demonstration that does not transmit data
- Table captions and row headers provided for rate tables

## SEO notes

- Unique title and meta description per page
- `Plumber` JSON-LD with address, hours and service areas on every page
- `sitemap.xml`, `robots.txt` generated at build time
- Open Graph tags present; add a 1200×630 social preview image before launch
