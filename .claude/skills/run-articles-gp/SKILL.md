---
name: run-articles-gp
description: render, preview, convert org to qmd, build articles-gp Quarto site
---

# run-articles-gp

Quarto-based article site. Source files are org-mode (in
`articles_original_org/`). CI converts them to `.qmd` (in `articles/`)
then renders to HTML. Locally the same two-step pipeline runs via the
smoke script below.

All paths are relative to the repo root
(`/mnt/wsl/sh_dt_vhdx/global-git/articles-gp` or wherever the `.git`
is).

---

## Prerequisites

```bash
quarto --version   # must be present; 1.9.38 confirmed working
# No other installs needed for HTML-only output
```

---

## Convert + render one org file (agent path)

```bash
# from anywhere inside the repo:
.claude/skills/run-articles-gp/smoke.sh <stem>
# <stem> = filename without extension, e.g. renting_the_floor_wip
# Output: /tmp/<stem>.html
```

Verified run (2026-08-17):

```
==> Converting …/renting_the_floor_wip.org -> /tmp/renting_the_floor_wip.qmd
Output created: renting_the_floor_wip.html
OK: /tmp/renting_the_floor_wip.html  (1727 lines)
```

---

## Render the full site

```bash
cd <repo-root>
quarto render --output-dir publish-final
```

**Known failure:** any `.md` file in the repo root that contains
executable code blocks causes Quarto to abort with:
`ERROR: You must use the .qmd extension for documents with executable code.`
Keep `renting_the_floor.md` (in `articles_original_org/`) or move it out
before running the full render.

Successful per-article render workaround:

```bash
cd <repo-root>
quarto render articles/renting_the_floor.qmd --output-dir /tmp/preview
```

---

## Pipeline (how CI does it)

1. `.github/workflows/org-to-qmd.yml` — on push to `main` when `*.org`
   changes: `quarto pandoc <file>.org --from org --to markdown+yaml_metadata_block --standalone -o articles/<file>.qmd`
   then patches ` ```ojs ` → ` ```{ojs} ` with `sed`.
2. `.github/workflows/render.yml` — on push or after org-to-qmd
   completes: `quarto render --output-dir publish-final` then deploys
   to GitHub Pages.

To replicate step 1 locally for one file:

```bash
quarto pandoc articles_original_org/<stem>.org \
  --from org \
  --to markdown+yaml_metadata_block \
  --standalone \
  -o articles/<stem>.qmd
sed -i -E 's/^``` ?(ojs|python|r|julia)$/```{\1}/' articles/<stem>.qmd
```

---

## Gotchas

- `pandoc` is not on PATH. Use `quarto pandoc` instead.
- `quarto render file.qmd -o /absolute/path.html` fails — Quarto
  rejects absolute `-o` paths. Work around: `cd /tmp && quarto render
  file.qmd` (outputs alongside the file).
- `renting_the_floor.md` in `articles_original_org/` has OJS cells;
  Quarto picks it up during site render and dies. Do not leave `.md`
  files with code blocks in any directory Quarto scans.
- `#+begin_story`, `#+begin_questions`, `#+begin_aside` in org source
  are custom block types; pandoc passes them through as raw divs.
  They render correctly in HTML via CSS in `renting_the_floor.css`.
