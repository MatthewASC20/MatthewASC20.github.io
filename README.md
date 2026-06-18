# Matthew De Jesus — Portfolio

A clean, modular portfolio site with subtle electrical-engineering theming.
All content is data-driven: **edit the JSON files in `data/`** to update the
site — no build step, no framework.

## Project structure

```
Website/
├── index.html                  # page shell + section markup
├── css/
│   ├── styles.css              # entry point — just @imports the partials
│   ├── tokens.css              # design tokens (light/dark themes)
│   ├── base.css                # reset, typography, shared utilities
│   ├── layout.css              # nav, sections, dividers, footer
│   └── components/             # one file per section
│       ├── hero.css  about.css  timeline.css  projects.css
│       ├── publications.css  skills.css  contact.css  modal.css
├── js/
│   ├── main.js                 # entry point (ES module) — boot + render order
│   ├── lib/
│   │   ├── dom.js              # $, $$, esc(), prefersReduced()
│   │   ├── icons.js            # inline SVG icon set
│   │   └── data.js             # fetches + merges the data/ JSON files
│   ├── render/                 # one renderer per section
│   │   ├── hero.js  about.js  timeline.js  projects.js
│   │   ├── publications.js  skills.js  contact.js
│   └── ui/
│       ├── theme.js            # light/dark toggle
│       ├── nav.js              # burger menu + scroll-spy
│       ├── scroll.js           # progress bar, reveal, divider pulses
│       └── modal.js            # project detail modal
├── data/                       # ← YOUR CONTENT lives here (edit these)
│   ├── profile.json            # name, roles, tagline, about, links, stats
│   ├── timeline.json           # experience + education entries
│   ├── projects.json           # project cards + modal details
│   ├── publications.json       # papers
│   └── skills.json             # skill groups
└── assets/                     # résumé + project PDFs (and any files you link)
```

## Preview it locally

The site uses ES modules and `fetch()`, so opening `index.html` directly
(file://) is blocked by the browser. Run a tiny local server instead:

```bash
cd Website
python3 -m http.server 8000
# then open http://localhost:8000
```

(Any static server works — `npx serve`, VS Code "Live Server", etc.)

## Adding / editing content

Everything is in **`data/`**. The site re-renders automatically.

### Add a timeline entry (experience or education)
Add an object to `data/timeline.json` (newest first):

```json
{
  "type": "experience",
  "role": "Hardware Engineering Intern",
  "org": "Company Name",
  "location": "City, ST",
  "start": "Jun 2026",
  "end": "Aug 2026",
  "summary": "One-line summary.",
  "highlights": ["Bullet one.", "Bullet two."],
  "tags": ["Power Electronics", "Python"]
}
```
Use `"type": "education"` for a degree (it gets a copper node + filter).

### Add a project
Add an object to `data/projects.json`:

```json
{
  "id": "unique-slug",
  "title": "Project Name",
  "subtitle": "Course / context",
  "icon": "power",
  "date": "2026",
  "featured": true,
  "blurb": "Short card description.",
  "description": ["Paragraph for the detail modal.", "Another paragraph."],
  "metrics": [{ "label": "Efficiency", "value": "98%" }],
  "highlights": ["Key point one.", "Key point two."],
  "tags": ["Power Electronics", "Python"],
  "links": [{ "label": "Report (PDF)", "url": "assets/file.pdf", "icon": "pdf" }]
}
```

- `"featured": true` makes the card span two columns on wide screens.
- `"icon"` options: `power`, `wave`, `chip`, `cpu`, `motor`, `embedded`, `code`.
- `"links[].icon"` options: `pdf`, `github`, `link`.
- Tags automatically become filter buttons in the Projects section.

### Add a publication, skill, or link
- **Publications** → add to `data/publications.json`. Your name is
  auto-bolded among the authors.
- **Skills** → edit `data/skills.json`: add an item to any group's
  `"items"`, or add a new group.
- **Contact / social links** → edit `profile.links` in `data/profile.json`
  (`email`, `linkedin`, `github`, `resume`).
- **Hero stats** → edit `"stats"` in `data/profile.json`.

### Add downloadable files
Put PDFs in `assets/` and reference them by path in the data files
(e.g. `"url": "assets/my-report.pdf"`). See `assets/README.txt`.
The expected filenames are:

| File | Used by |
|------|---------|
| `photo.jpg` | Your portrait in the About card |
| `Matthew_De_Jesus_Resume.pdf` | Résumé buttons |
| `buck-converter-report.pdf` | Buck Converter project |
| `gan-coss-apec2026.pdf` | GaN project + publication |
| `diff-amp-ic.pdf` | Differential Amplifier project |

## Deploy to GitHub Pages

1. Create a repo and push these files:
   ```bash
   cd Website
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment**, set
   **Source = Deploy from a branch**, **Branch = `main` / `root`**, Save.
3. Your site goes live at `https://<you>.github.io/<repo>/` in a minute or two.

No build step is required — it's plain HTML/CSS/JS with native ES modules.

## Customizing the look

Colors, spacing, and fonts are CSS variables in **`css/tokens.css`**
(`:root` for light, `[data-theme="dark"]` for dark). Change `--accent`
to re-skin the whole site. A light/dark toggle is in the nav and
remembers the visitor's choice (with no flash on reload).
