import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jdcsolar.com',
  output: 'static',
  outDir: 'dist_astro',
  build: {
    format: 'directory',
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
