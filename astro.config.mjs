// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  site: "https://mxl-legacy.de",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/drafts/"),
      changefreq: "monthly",
      priority: 0.7,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
