import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const repo = 'portafolio-ian';

export default defineConfig({
  plugins: [react()],
  base: `/${repo}/`,
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
});
