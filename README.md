# Skills EQ Dashboard

Static React dashboard for the WGU B.S. User Experience Design Skills EQ prototype.

The root `index.html` is set up to run directly on GitHub Pages with no build step. The Vite files are still included for local development if Node is available later.

## What changed

- Recreated the provided dashboard as a GitHub-ready Vite app.
- Removed any need for API keys by committing the source spreadsheet and generated JSON.
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

The generated JSON/JS data comes from `scripts/generate_program_data.py` and uses only Python's standard library.
