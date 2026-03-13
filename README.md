# Skills EQ Dashboard

Static React dashboard for the WGU B.S. User Experience Design Skills EQ prototype.

## What changed

- Recreated the provided dashboard as a GitHub-ready Vite app.
- Removed any need for API keys by committing the source spreadsheet and generated JSON.
- Added GitHub Pages deployment workflow for the `Skills_EQ` repository.

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

The generated JSON comes from `scripts/generate_program_data.py` and uses only Python's standard library.
