import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
      },
      '/refresh_token': {
        target: 'http://localhost:3000/',
      },
    },
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
});