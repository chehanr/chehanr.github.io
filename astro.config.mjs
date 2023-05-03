import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import image from "@astrojs/image";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://chehanr.com",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react(),
    image(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
