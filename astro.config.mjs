import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jessehuss.com',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
});
