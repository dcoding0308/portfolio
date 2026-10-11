# Devansh Raina — Engineering Portfolio

A static, single-page portfolio focused on technical storytelling across clinical machine learning and real-time conversational AI.

## Run locally on macOS

Open the workspace root (the folder containing `pnpm-workspace.yaml`) in VS Code. Install Node.js and pnpm, then run:

```sh
pnpm install --force
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/devansh-portfolio run dev
```

Open `http://localhost:5173`. Keep the terminal running while using the site; press `Ctrl+C` to stop the development server.

The local workspace configuration enables the native Apple Silicon packages required by local builds while retaining the 1,440-minute minimum package release age. After installing, pnpm may update `pnpm-lock.yaml` to match this configuration.

Create a production bundle with:

```sh
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/devansh-portfolio run build
```

Run the TypeScript check with:

```sh
pnpm --filter @workspace/devansh-portfolio run typecheck
```

## Structure

- `src/App.tsx` — page sections and interactions, including the hero system map, professional case studies, career timeline, personal projects, skills explorer, engineering approach, and contact section.
- `src/content.ts` — typed project, milestone, clinical case-study, voice architecture, and skills content.
- `src/index.css` — visual design system, responsive layout, typography, interaction states, and reduced-motion handling.
- `public/favicon.svg` — local monogram favicon.
- `scripts/generate-seo-assets.mjs` — creates canonical and sitemap assets when `PORTFOLIO_SITE_URL` is set to the final HTTPS origin.

## Add a project

Add a confirmed entry to the `projects` array in `src/content.ts`:

- `flow`: the 3–4 steps drawn in the card's small diagram.
- `highlights` (optional): up to three verified results. Each figure must appear in the project's own repository.
- `githubUrl` (optional): add only a real public repository URL; the GitHub button is hidden without it.
- `demoUrl` (optional): add only a real, working demo URL the owner has approved; the "Live demo" button is hidden without it.

Project filters are built from the categories in use. To link a skill to a project, add the project's exact title to that skill's `projects` list. Do not create placeholder cards for upcoming projects.

## Content integrity

Use only verified professional details, outcomes, and metrics. Do not add patient information, confidential company code, private links, or invented achievements. Keep company work at an approved, anonymized level. The clinical case study follows the approved project deck at a high level: no customer names, cohort sizes, internal model names, or exact thresholds. No dataset-size figure is shown until the correct unit is confirmed.

## Search indexing

Set `PORTFOLIO_SITE_URL` to the final HTTPS site origin before a production build to create an absolute sitemap and canonical URL. Without it, the build omits those domain-specific values rather than publishing a placeholder.
