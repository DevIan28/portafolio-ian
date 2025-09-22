import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';

export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : '/',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
});
