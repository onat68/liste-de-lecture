import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    //
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
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false
      },
      manifest: {
        includeAssets: ["assets/*", "deezerLogo.svg", "deezerLogoBlack.svg"],
        name: 'RList',
        short_name: 'RList',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: './assets/Logo/logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './assets/Logo/logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
