// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Currently the free workers.dev address. [TODO: swap for a custom domain if Chris gets one.]
  // The sitemap and canonical URLs need it.
  site: 'https://portfolio.hsiao516.workers.dev',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
