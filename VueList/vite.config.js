import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/dzr": {
        target: "https://api.deezer.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dzr/, ""),
      },
      "/db": {
        target: "http://90.3.112.97:3000/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/db/, ""),
      },
      "/tmdb": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tmdb/, ""),
      },
      "/gb": {
        target: "https://www.googleapis.com/books",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/gb/, ""),
      },
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
