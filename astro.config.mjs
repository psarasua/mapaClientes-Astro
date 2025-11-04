// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config  
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  server: {
    port: 4321,
    host: true
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        port: 4322
      }
    }
  }
});