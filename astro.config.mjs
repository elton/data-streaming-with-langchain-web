import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  output: 'server',
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  adapter: node({
    mode: 'standalone'
  })
});