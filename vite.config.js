import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
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