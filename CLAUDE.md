# CLAUDE.md — Chris Hsiao portfolio site

Personal portfolio website for **Chris Hsiao**: 7 years as a frontend developer in Taiwan, finishing a Master of Applied Computing at Lincoln University (graduating Nov 2026), looking for **full-stack developer / AI developer** roles in Christchurch & Canterbury, NZ.

**Audience:** NZ recruiters and hiring managers. They spend 30–60 seconds on the site. Every page must quickly answer: who is Chris, what has he built, how do I contact him.

**The site itself is a portfolio piece.** It must be fast, accessible, responsive and clean — recruiters for frontend/full-stack roles will judge the code quality and Lighthouse scores.

---

## 1. How we work (read this first)

Chris prefers a structured, step-by-step workflow:

1. **Work one phase at a time** (see §10 Build plan). Do not start the next phase until Chris says so.
2. **Before each phase:** briefly state what you will build and which files you will create/change. Wait for "go" if anything is unclear.
3. **After each phase:** stop, summarise what changed, tell Chris how to check it (`npm run dev`, which URL, what to look at), and wait for review.
4. **Explain the "why"** behind technical choices in plain, short language. Chris wants to understand the code, not just receive it.
5. **When unsure, ask.** Never guess facts about Chris (dates, numbers, employers, results, URLs). Use a visible placeholder like `[TODO: Lighthouse score before → after]` and list it in your phase summary.
6. Keep changes small and reviewable. No large refactors unless asked.
7. Use **NZ/British English** in all site copy (colour, organise, tyre, jewellery, programme).
8. Do not add features, pages or libraries that are not in this file without asking first.

---

## 2. Tech stack (decided)

| Area | Choice | Notes |
|---|---|---|
| Framework | **Astro** (latest stable) | Static output (`output: 'static'`). No SSR adapter needed. |
| Language | **TypeScript** (strict) | |
| Styling | **Tailwind CSS** | Design tokens from §4 in the Tailwind theme. |
| Interactive UI | **React**, via `@astrojs/react` | **Only** for the chat widget. Everything else is plain `.astro` components with zero client JS. |
| Content | Astro **content collections** (Markdown) | Case studies in Markdown + typed frontmatter (§6). |
| Fonts | **Fontsource** (self-hosted) | `@fontsource/inter` (400/500/600), `@fontsource/space-grotesk` (500/600/700), `@fontsource/jetbrains-mono` (500). No Google Fonts requests. |
| Images | `astro:assets` `<Image />` | Auto-optimised (WebP/AVIF, sizes). |
| SEO | `@astrojs/sitemap` | Plus per-page meta + Open Graph (§9). |
| Hosting | **Cloudflare** (Workers static assets) | Deploy from GitHub; follow Cloudflare's Astro guide. |
| Analytics | Cloudflare Web Analytics | Cookie-free, enabled in the Cloudflare dashboard (or its JS snippet). |

Node 20+. Use npm.

---

## 3. Site map

```
/                      Home (single long page, sections below)
/projects/frizzell/    Case study (Markdown)
/projects/<slug>/      Future case studies (same template)
/404                   Simple not-found page with link home
/Chris-Hsiao-CV.pdf    Static file in /public (Chris will supply)
```

### Home page sections (top → bottom)

1. **Header / nav** — "Chris Hsiao" (links to top) · Ask me · Work · About · Contact · **Download CV** (dark button → the PDF). Wraps on mobile.
2. **Hero** — status pill "Graduating Nov 2026 · Open to work" (green dot), H1, intro paragraph, buttons "View my work" (accent) + "Get in touch" (outline). Right: **Quick facts** card (Based in / Studying / Experience / Looking for / Languages).
3. **Ask me anything** (`#ask`) — left: copy + "How I built it →" (GitHub). Right: **chat widget** (React island, §7).
4. **Selected work** (`#work`, grey `#F1F5F9` band) — "Real projects, real problems":
   - Featured large card: **Frizzell** (image left, text right) → "Read the case study →".
   - Two cards side by side: **Ask-Me-Anything RAG Chatbot**, **TodoFlow**.
   - Sub-section **"Before New Zealand: 7 years in Taiwan"** — 6 client link cards (name + type · domain + ↗), 3 per row on desktop.
5. **About** (`#about`) — photo (4:5) left; "From Taiwan to Canterbury", 2 paragraphs, "How I work" list, 4 skill cards.
6. **Contact** (`#contact`, dark `#0F172A` band, id `cv` on the button group) — "Let's talk.", email button (white), LinkedIn / GitHub / CV (PDF) outline buttons.
7. **Footer** (dark) — "© 2026 Chris Hsiao" · "Designed and built by me · Hosted on Cloudflare".

**Exact layout and copy live in the design reference files** — see §5.

---

## 4. Design tokens

### Colours

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0F172A` | Headings, dark buttons, dark sections |
| `body` | `#334155` | Body text |
| `muted` | `#475569` | Secondary text, labels, placeholders |
| `line` | `#E2E8F0` | Borders, image placeholders |
| `line-strong` | `#CBD5E1` | Input borders, chip borders |
| `surface` | `#F8FAFC` | Quick-facts card, decision cards |
| `band` | `#F1F5F9` | Work section background, tags |
| `accent` | `#4338CA` | Primary buttons, accent text, links |
| `accent-dark` | `#312E81` | Link hover, pill text |
| `accent-soft` | `#EEF2FF` | Status pill, featured tag |
| `success` | `#15803D` | "Open to work" / "Online" dot |
| `on-dark` | `#F8FAFC` | Text on dark |
| `on-dark-muted` | `#CBD5E1` | Secondary text on dark |
| `on-dark-accent` | `#A5B4FC` | Labels on dark |
| `footer-text` | `#94A3B8` | Footer text |
| `footer-line` | `#1E293B` | Footer top border |

All text must meet WCAG AA contrast (4.5:1; 3:1 for ≥24px). The pairs above already pass — don't introduce lighter greys.

### Typography

- **Headings:** Space Grotesk. **Body:** Inter. **Small labels:** JetBrains Mono, 13px, uppercase, `letter-spacing: 0.04em`.
- Base body: 17px / line-height 1.6 (case study prose 1.65).
- H1 hero: 60px, line-height 1.05, `-0.02em`, weight 700. Case study H1: 56px.
- H2 sections: 40px / 1.15, `-0.01em`. Contact H2: 48px. Case study H2: 32px.
- H3: featured card 30px, cards 22px, sub-section 26px, small 20px.
- Lead paragraph: 20px.
- Scale headings down on mobile (e.g. H1 ~40px, H2 ~30px) using `clamp()` or responsive classes.

### Layout & shape

- Container: `max-width: 1120px`, horizontal padding 24px. Case study prose column: `max-width: 760px`.
- Section vertical padding: 88–96px desktop, ~64px mobile.
- Radius: large cards 16px · small cards 12px · buttons/inputs 8px · tags 6px · pills 999px.
- Cards: 1px `line` border, white background. Chat widget only: shadow `0 12px 40px rgba(15,23,42,0.08)`.
- Layout uses flex-wrap with min widths (cards ~300px) so everything stacks naturally on phones. Must work from 360px wide.
- Touch targets ≥ 44px. Visible focus ring on all interactive elements (use accent, 2px offset).
- No emoji icons. Arrows (→ ↗) are text; any icons are inline SVG with `aria-hidden="true"`.

---

## 5. Design reference files

`design-reference/home.dc.html` and `design-reference/case-study-frizzell.dc.html` are exports from the approved design canvas. **Use them as the source of truth for layout, spacing and copy.**

They are in a design-tool format, so translate — don't copy the runtime:
- `{{accent}}` → the `accent` colour `#4338CA`.
- `<x-dc>`, `<helmet>`, `<sc-for>`, `<sc-if>`, `<script type="text/x-dc">`, `support.js` → design-tool syntax. Ignore; rebuild as Astro components + Tailwind.
- Inline `style="…"` values → Tailwind classes / theme tokens.
- Grey boxes with `[Screenshot …]` / `[Your photo]` → image slots waiting for real assets (§8).
- The chat demo's sample answers in the `<script>` block were for the prototype only. The real widget talks to the live API (§7).

---

## 6. Content model

### `src/content/projects/*.md` (content collection `projects`)

Define a Zod schema in `src/content.config.ts`. Suggested fields:

```ts
{
  title: string,              // "Rebuilding Frizzell's website and online shop"
  cardTitle: string,          // "Frizzell Agricultural Electronics — website & online shop"
  summary: string,            // 1–2 sentence card blurb
  category: string,           // "AI · Full-stack · Live"
  tags: string[],             // ["WordPress", "WooCommerce", "Elementor Pro"]
  featured: boolean,
  order: number,              // sort order on home page
  cover?: image(), coverAlt?: string,
  links?: { live?: string, github?: string },
  hasCaseStudy: boolean,      // true → card links to /projects/<slug>/
  // case-study-only fields (optional):
  role?: string, timeline?: string, tools?: string[], status?: string,
  decisions?: { title: string, text: string }[],
  results?: { number: string, label: string }[],
  beforeAfter?: { before: image(), after: image(), beforeAlt: string, afterAlt: string },
  highlights?: string[],      // bullet list on the featured home card
}
```

- Projects shown on Home: `frizzell` (featured, case study), `rag-chatbot`, `todoflow`. Only Frizzell has a case study for now.
- Case study **body** (Markdown) holds the prose sections: *The problem*, *What I did*, *Challenges and fixes*, *What I learned*. The template renders the meta row, hero image, decision cards, before/after and results cards from frontmatter, in the order shown in the design reference.
- Style Markdown prose with a dedicated component/class (e.g. Tailwind Typography plugin customised to the tokens, or hand-written CSS) so it matches the design.
- "Next project" card at the bottom of a case study → next project by `order`.

### Data files (`src/data/`)

- `site.ts` — name, email (`chris.hsiao.nz@gmail.com`), LinkedIn (`https://www.linkedin.com/in/ming-cheng-hsiao/`), GitHub (`https://github.com/hsiaomingcheng`), CV path, site URL `[TODO: domain]`.
- `taiwan-clients.ts` — R88 (Game developer, https://r88games.com/en) · MayChen (Food R&D company, https://www.maychen.com.tw/en) · MOCA Taipei (Contemporary art museum, https://www.mocataipei.org.tw/en) · GoodTire (Tyre company, http://www.goodtire.com.tw/en) · H2O Hotel (Hotel, https://www.h2ohotel.com.tw/en) · Papillon (Jewellery brand, https://www.great-papillon.com.tw/zh-tw). External links: `target="_blank" rel="noopener"`.
- `skills.ts` — Frontend: HTML, CSS, JavaScript, React, Vite, Tailwind CSS · CMS & e-commerce: WordPress, WooCommerce, Elementor Pro · Backend: FastAPI, Flask, Python, MySQL, PostgreSQL · Tools & ways of working: Git, GitHub, Vercel, Cloudflare, Jira, Scrum.

---

## 7. "Ask my CV" chat widget + backend wake-up

The chatbot backend already exists: **github.com/hsiaomingcheng/rag-chatbot** (FastAPI on Render free tier; frontend React + Vite on Vercel). Reuse its frontend code where possible — Chris will copy the relevant files in when we reach this phase:
- `frontend/src/api/` — streaming API client (SSE)
- `frontend/src/components/` — chat UI components
- `frontend/src/hooks/` — server wake-up detection

### API
- `GET  {API}/api/health` — liveness check; also wakes the sleeping server.
- `POST {API}/api/chat/stream` — body: the question (max **500 characters**, also enforced server-side); returns SSE text chunks, then a `done` or `error` event.
- `{API}` comes from env var `PUBLIC_CHATBOT_API_URL` (`.env`, git-ignored; add `.env.example`).

### Early wake-up ping (required)
Render's free tier sleeps when idle. Wake it as soon as **any** page loads, so it is awake by the time the visitor scrolls to the chat:

- Put a tiny inline `<script>` in `BaseLayout.astro` (no React, runs on every page).
- Fire-and-forget `fetch(`${API}/api/health`)` — never `await`, never block rendering, swallow errors silently.
- Send **once per browsing session**: guard with a `sessionStorage` flag.
- Wrap `sessionStorage` access in `try/catch` (can throw in some privacy modes).

### Widget behaviour
- React island in the `#ask` section, hydrated with `client:visible` (the layout ping already handles early wake-up).
- Header: avatar "CH", "Ask Chris's CV", status dot: **Online** (green) / **Waking up…** while the health check is pending (input disabled + retry, as in the original hook).
- Greeting bubble: "Hi! Ask me anything about Chris's experience, skills or projects."
- Suggested question chips (clicking sends the question):
  - "What did Chris build at Frizzell?"
  - "How much experience does he have?"
  - "What roles is he looking for?"
  - "What's his phone number?" ← deliberately shows the bot declining to invent info
- Visitor bubble = accent background, white text; bot bubble = `band` background. Render bot answers as streamed Markdown (react-markdown, as in the original).
- Input with a real `<label>` (visually hidden), `maxLength={500}`, character limit message, Send button. Enter sends.
- Error state: friendly message + "Email Chris instead" link.
- Accessible: message list is an `aria-live="polite"` region; buttons are real `<button>`s.
- Small link under the widget: "Open the full chatbot ↗" → https://rag-chatbot-psi-liart.vercel.app/

### Backend change (separate repo — do NOT edit here)
The backend's **CORS allowlist** must include the portfolio domain (and `http://localhost:4321` for local dev). Remind Chris to update this in the rag-chatbot repo/Render settings when we reach this phase.

---

## 8. Assets and placeholders (Chris to supply)

Never invent these. Use a clearly labelled placeholder until provided, and list outstanding items in every phase summary.

- [ ] `public/Chris-Hsiao-CV.pdf`
- [ ] Profile photo (About section, 4:5)
- [ ] Frizzell screenshots: new homepage (featured card + case study hero, desktop + phone), old vs new homepage — **company permission needed before publishing**
- [ ] RAG chatbot screenshot
- [x] TodoFlow screenshot → `src/assets/projects/todoflow-board.jpg` (crop from top-left in the card)
- [ ] Case study: extra sentence for "The problem", "What I learned" (Chris's own words), page-speed result `[x → y]`
- [ ] Domain name
- [ ] Open Graph share image (1200×630) — can be generated from the hero design once the domain is known

---

## 9. SEO, meta and quality bar

- `<html lang="en-NZ">`. Unique `<title>` and meta description per page. Title pattern: `Chris Hsiao — Full-stack & AI Developer` (home), `<Case study title> | Chris Hsiao` (others).
- Open Graph + Twitter card tags, canonical URL, favicon (simple "CH" monogram SVG).
- `@astrojs/sitemap` + `robots.txt`.
- Semantic HTML: one `<h1>` per page, landmarks (`header`, `nav`, `main`, `footer`), `aria-labelledby` on sections, alt text on every image.
- Respect `prefers-reduced-motion` (smooth scroll only when allowed).
- **Targets:** Lighthouse ≥ 95 in Performance, Accessibility, Best Practices, SEO on mobile. Zero JS on pages except the chat island + wake-up ping.

---

## 10. Build plan (one phase at a time — stop and wait after each)

0. **Scaffold** — Astro + TypeScript + Tailwind + React integration + sitemap, Fontsource fonts, folder structure, `.env.example`, `.gitignore`, README. Confirm `npm run dev` runs.
1. **Foundations** — Tailwind theme tokens (§4), `BaseLayout.astro` (meta, fonts, skip-to-content link), `Header`, `Footer`, `site.ts`.
2. **Hero** — status pill, H1, intro, buttons, Quick facts card.
3. **Work section** — content collection + schema, 3 project entries, featured card + project cards.
4. **Taiwan clients** sub-section.
5. **About** — photo slot, copy, How I work, skill cards.
6. **Contact** section + CV links.
7. **Case study template** + `frizzell.md` (all sections from the design reference) + "Next project" card.
8. **Chat widget** + early wake-up ping (§7). Remind Chris about CORS.
9. **SEO & polish** — meta/OG, sitemap, robots, 404, favicon, responsive check at 360 / 768 / 1280px.
10. **Quality pass** — Lighthouse + keyboard-only + screen-reader basics; fix issues.
11. **Deploy** — GitHub → Cloudflare, custom domain, env var, Web Analytics; final checklist.

---

## 11. Commands

```bash
npm run dev       # local dev server (http://localhost:4321)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## 12. Don'ts

- No lorem ipsum, invented stats, fake testimonials or skill-percentage bars.
- No React/client JS for static sections.
- No secrets in code; `.env` stays git-ignored.
- No blog, dark-mode toggle, animations library or CMS unless Chris asks.
- Don't edit the rag-chatbot backend from this repo.
