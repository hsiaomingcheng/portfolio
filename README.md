# Chris Hsiao — portfolio

Personal portfolio site: Astro (static) + TypeScript + Tailwind CSS v4, with a React island for the chat widget only. Hosted on Cloudflare.

See `CLAUDE.md` for the full spec, design tokens and build plan.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Environment

Copy `.env.example` to `.env` and set `PUBLIC_CHATBOT_API_URL` (the rag-chatbot API base URL).

## Structure

```
src/pages/          routes
src/layouts/        page layouts
src/components/     Astro components (and the React chat widget)
src/content/        content collections (projects)
src/data/           site data (links, clients, skills)
src/assets/         images processed by astro:assets
public/             static files (CV PDF, robots.txt)
```
