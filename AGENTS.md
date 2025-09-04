# Repository Guidelines

## Project Structure & Module Organization
- Root-level static app: `index.html`, `styles.css`, `mobile.css`, `print.css`, `script.js`, `data.js`.
- PWA assets: `manifest.json`, `service-worker.js`, `favicon.*`, `icons/`.
- Utilities: `generate-icons.js` (uses `sharp`) and optional `generate-icons.html` for preview.
- Docs: `README.md` (overview), this file (contributor guide).

## Build, Test, and Development Commands
- `npm install`: installs dev dependency `sharp` for icon generation.
- `npm run generate-icons`: builds icons into `icons/` from base assets.
- Local serve (required to test Service Worker/PWA): `python -m http.server 8000` then open `http://localhost:8000/`.
- Quick view (no SW): open `index.html` directly in a browser.

## Coding Style & Naming Conventions
- Indentation: HTML/CSS 2 spaces; JS 4 spaces (match existing files).
- JavaScript: prefer `const`/`let`; use single quotes and end statements with semicolons; camelCase for variables/functions.
- Files: kebab-case for new files (e.g., `trip-utils.js`).
- CSS: BEM-ish class names where helpful; group variables at top of `styles.css`.
- Keep dependencies minimal; vanilla JS and Leaflet are the baseline.

## Testing Guidelines
- No formal test framework yet. Perform manual smoke tests:
  - Load map layers, markers, and popups.
  - Verify PWA install and offline caching after first load.
  - Check responsive views (mobile.css) and print styles.
- If adding logic-heavy utilities, include small, isolated functions and console-based checks.

## Commit & Pull Request Guidelines
- Commits: use Conventional Commits style where possible: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- PRs should include:
  - Clear description and motivation; link related issues.
  - Screenshots/GIFs for UI changes (map, timeline, dark mode).
  - Notes on PWA cache changes; bump cache version in `service-worker.js` if asset lists change.

## Security & Configuration Tips
- Do not commit secrets or API keys. This app uses public map tiles only.
- Test Service Worker updates with a hard refresh and in an incognito window when validating cache changes.
- Node LTS recommended for `sharp` icon generation.

