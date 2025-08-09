// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const useStatic = Boolean(process.env.BUN_BUILD);

/** @type {import('astro').AstroUserConfig} */
const baseConfig = {
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
    ? { ...baseConfig, output: "static" }
    : (async () => {
        const { default: netlify } = await import("@astrojs/netlify");
        return defineConfig({ ...baseConfig, adapter: netlify(), output: "server" });
      })()
);
