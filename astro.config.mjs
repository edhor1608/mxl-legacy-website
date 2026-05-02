// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const useStatic = Boolean(process.env.BUN_BUILD);

const sharedConfig = {
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
  prefetch: true,
};

export default defineConfig(
  useStatic
    ? {
        ...sharedConfig,
        output: "static",
      }
    : {
        ...sharedConfig,
        adapter: netlify(),
        output: "server",
      },
);
