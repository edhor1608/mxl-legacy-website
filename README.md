# MXL Legacy

A fast, open-source tribute site for the MXL sim-racing league—built with Astro &amp; Tailwind CSS, featuring scroll-based navigation and static pages.

A statically generated, scroll-navigable tribute website for the retired MXL sim-racing league.
Built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/) for blazing-fast performance, simple deployment, and easy community contributions.

![MXL Legacy Demo](https://via.placeholder.com/800x300?text=MXL+Legacy)

## Table of Contents

1. [Features](#features)
2. [Quick Start](#quick-start)
3. [Project Structure](#project-structure)
4. [Development](#development)
5. [Build & Preview](#build--preview)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

## Features

* **Astro-powered** static site: zero-JavaScript by default, islands for optional interactivity
* **Tailwind CSS** for utility-first styling and rapid design
* **Scroll navigation**: sticky header links to full-page sections
* **Multi-page support**: file-based routing for up to 10 pages
* **SEO & performance** best practices out of the box
* **CI/CD** via GitHub Actions → Netlify or Vercel preview & production deploys
* **Open source**: easy for anyone to fork, contribute, and improve

## Quick Start

```bash
# Clone the repo
git clone https://github.com/your-org/mxl-legacy.git
cd mxl-legacy

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Navigate to `http://localhost:3000` to see your changes live.

## Project Structure

```
mxl-legacy/
├── public/               # Static assets (images, icons)
│   └── placeholder.jpg
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Section.astro
│   │   └── Footer.astro
│   ├── layouts/          # Layout wrappers
│   │   └── BaseLayout.astro
│   └── pages/            # File-based routes
│       ├── index.astro   # Single-page sections
│       ├── about.astro
│       ├── drivers.astro
│       └── gallery.astro
├── astro.config.mjs      # Astro configuration
├── tailwind.config.cjs   # Tailwind CSS configuration
├── postcss.config.cjs    # PostCSS configuration
├── package.json          # Scripts & dependencies
└── README.md             # Project documentation
```

## Development

* **`npm run dev`**
  Start Astro’s dev server with file watching and HMR.

* **`npm run lint`**
  (Optional) Run any configured linters.

* **`npm run format`**
  (Optional) Format code with Prettier.

## Build & Preview

* **`npm run build`**
  Generate the production-ready `dist/` directory (static HTML, CSS, and any island JS).

* **`npm run preview`**
  Serve the built `dist/` locally to verify before deploying.

Here’s the adjusted **Deployment** section in your README to focus solely on Netlify:

````markdown
## Deployment via Netlify

We’ll use Netlify’s free tier to host the fully static output.

1. **Install the Netlify CLI** (if you haven’t yet):
   ```bash
   npm install -g netlify-cli
````

2. **Login** (once):

   ```bash
   netlify login
   ```

3. **Link your project** to a Netlify site (run in your repo root):

   ```bash
   netlify init
   ```

   * Choose “Create & configure a new site”
   * Select your Git provider & repo
   * Pick “Astro” as the build command (`npm run build`) and `dist/` as the publish directory

4. **Deploy** a draft:

   ```bash
   netlify deploy
   ```

5. **Publish to production**:

   ```bash
   netlify deploy --prod
   ```

### CI/CD with GitHub Actions

Add this workflow to `.github/workflows/deploy.yml` to build on every push to `main` and auto-deploy to Netlify:

```yaml
name: CI & Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID:    ${{ secrets.NETLIFY_SITE_ID }}
```

Be sure to add two repository secrets under Settings ▶ Secrets:

* `NETLIFY_AUTH_TOKEN` (your Netlify personal access token)
* `NETLIFY_SITE_ID` (the Site ID from your Netlify dashboard)

This setup will automatically rebuild and publish every time you merge into `main`.

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

> Built with ❤️ by the MXL community.
> Visit our [GitHub organization](https://github.com/your-org) to explore more projects.
