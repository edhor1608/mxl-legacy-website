# Architecture

## Overview

The site is an Astro 5 archive site. Pages are server-rendered at build time for static output, with Tailwind CSS supplied through the Vite plugin.

## Data Flow

`src/data/people.ts` is the source of truth for driver and Hall of Fame profiles. Components consume this data directly through page files. `src/data/site.ts` owns shared metadata such as the site URL, language, and default social image.

## Routes

German routes are canonical. English routes exist only as compatibility redirects where needed. Driver profile pages are generated from `people.link` under `/fahrer/:slug`, and `/drivers/:slug` redirects to the matching German route.

## Metadata

Pages pass title, description, canonical URL, image, and optional structured data into `BaseLayout`, which renders `SEO.astro`. Images used for Open Graph, Twitter, or JSON-LD must resolve to real files under `public/` or absolute external URLs with known provenance.
