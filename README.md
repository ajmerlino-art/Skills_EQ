# Skills EQ Dashboard

Interactive dashboard for the WGU B.S. User Experience Design Skills EQ prototype.

The published page runs from plain local HTML/CSS/JS with no build step and no third-party runtime dependency. The earlier Vite/React files are still included as source/reference work.

## What changed

- Recreated the provided dashboard as a GitHub-ready Vite app.
- Removed any need for API keys by committing the source spreadsheet and generated JSON.
- Reintroduced interaction on GitHub Pages with client-side tabs, search, filtering, and detail panels.
- Added a GitHub Pages workflow template at `docs/github-pages-deploy.yml`.

## Publishing on GitHub

If you want GitHub Pages automation, move `docs/github-pages-deploy.yml` to `.github/workflows/deploy.yml`.
The push token available in this session does not have the GitHub `workflow` scope, so the workflow is stored as a template instead of being pushed live.

## Local development

```bash
npm install
npm run generate:data
npm run dev
```

## Build

```bash
npm run build
```

## Data sources

- `public/assets/course-skills.xlsx`
- `public/assets/document-reference.pdf`
- `src/data/program-data.json`
- `src/data/program-data.global.js`
- `src/site.js`
- `src/site.css`

The generated JSON/JS data comes from `scripts/generate_program_data.py` and uses only Python's standard library.
