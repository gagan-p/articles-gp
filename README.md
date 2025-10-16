# Articles Publishing Guide

This repository hosts a Quarto website for publishing policy and data analysis articles. The instructions below outline how to publish the site with GitHub Pages.

## Repository structure

- `_quarto.yml` – project configuration for the website.
- `index.qmd` – landing page for the site.
- `articles/` – directory containing article source files.

## Requirements

1. **Quarto CLI** – Install from [https://quarto.org/docs/get-started/](https://quarto.org/docs/get-started/).
2. **Git** – Required to commit and push the generated site.
3. **GitHub repository** – This project should live in a GitHub repository that you own and have push access to.

## First-time setup on GitHub

1. Create a new GitHub repository (or use an existing one) and push this project to the `main` branch.
2. Open the repository settings in GitHub and navigate to **Pages**.
3. Set **Source** to "Deploy from a branch" and select the `gh-pages` branch that Quarto will create for you. Leave the folder set to `/ (root)`.
4. Save the settings. GitHub will now serve content from the `gh-pages` branch at `https://<username>.github.io/<repository>/`.

## Publishing workflow

1. Open a terminal in the project directory and ensure dependencies are installed:
   ```bash
   quarto check
   ```
2. Render the site locally (optional but recommended to preview changes):
   ```bash
   quarto render
   ```
   The rendered site will be written to the `publish-final/` directory defined in `_quarto.yml`.
3. Publish the rendered site to GitHub Pages:
   ```bash
   quarto publish gh-pages
   ```
   - When prompted, authenticate with GitHub if this is your first publish.
   - Quarto will render the site (if needed), create/update the `gh-pages` branch, and push the output.
4. Commit any source changes (e.g., updated `.qmd` files) to `main`:
   ```bash
   git add .
   git commit -m "Update articles"
   git push origin main
   ```

## Updating the site

- Repeat the publishing workflow whenever you add or edit articles.
- GitHub Pages typically updates within a minute or two after the `gh-pages` branch receives the new commit.
- To verify the deployment, visit the GitHub Pages URL or check the **Pages** section in the repository settings for status updates.

## Troubleshooting tips

- If `quarto publish gh-pages` fails due to authentication, make sure you have set up a GitHub personal access token (PAT) with `repo` scope and configured it for the session (e.g., via `GITHUB_PAT`).
- If the site is not updating, confirm that the `gh-pages` branch has the latest commit and that GitHub Pages is configured to use that branch.
- For custom domains, add a `CNAME` file to the `gh-pages` branch and configure DNS records to point at GitHub.

