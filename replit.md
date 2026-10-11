# Devansh Raina — Engineering Portfolio

A responsive personal engineering portfolio presenting verified work in clinical machine learning, conversational voice AI, and production software systems.

## Run & Operate

- `pnpm --filter @workspace/devansh-portfolio run dev` — run the portfolio preview
- `pnpm --filter @workspace/devansh-portfolio run typecheck` — check portfolio TypeScript
- `pnpm --filter @workspace/devansh-portfolio run build` — build the static site; set `PORTFOLIO_SITE_URL` to the final HTTPS origin for canonical metadata and a sitemap

## Stack

- pnpm workspaces, React, TypeScript, Vite, and Tailwind CSS
- Static, content-driven frontend; no portfolio API, database, credentials, or external integrations

## Where things live

- `artifacts/devansh-portfolio/src/App.tsx` — portfolio structure and interactions
- `artifacts/devansh-portfolio/src/content.ts` — typed milestones, projects, clinical case-study copy, skills, architecture, decision prompts, and draft note topics
- `artifacts/devansh-portfolio/src/index.css` — theme, layout, and reduced-motion behavior
- `artifacts/devansh-portfolio/README.md` — run commands and content update guide

## Architecture decisions

- Keep the portfolio static and content-driven to avoid unnecessary backend or account setup.
- Use the resume and supplied project briefs as the factual source; keep unknown results, URLs, current work, and unpublished projects out of public claims.
- Project GitHub and live-demo links are optional and hidden unless the user supplies an approved real URL.
- Generate canonical metadata and an absolute sitemap only when the final site origin is configured.

## Product

Recruiters and engineering managers can jump from the hero to either professional case study, then explore the career journey, four personal projects (three with public repositories and one with a live demo), and a consolidated notebook of evidence-linked skills, draft note ideas, a decision-record template, and the current-focus empty state. Interactions include milestone selection, case-study disclosures, project filters, architecture inspection, editable illustrative latency values, and skill filtering.

## User preferences

- Do not publish fabricated outcomes, metrics, projects, links, or professional experiences.
- Keep the phone number out of the portfolio. The site offers no resume download (removed at the user's request).
- Do not publish or deploy without the user’s explicit approval.

## Gotchas

- The clinical case study follows the user's approved deck at a high level; never publish customer names, cohort sizes, internal model names, or exact thresholds. No dataset-size figure until the user confirms the unit.
- Latency editor values are visibly illustrative sample data, not measured performance.
- The GitHub profile URL (github.com/dcoding0308) was supplied by the user; add no LinkedIn URL unless the user supplies it.
- Domain-specific canonical and sitemap output requires `PORTFOLIO_SITE_URL`; otherwise it is intentionally omitted.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
