import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
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
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
});