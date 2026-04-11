import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://speakpath.dev',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
