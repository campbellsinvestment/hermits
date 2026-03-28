import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/hermits/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        scholarships: resolve(__dirname, 'scholarships/index.html'),
        events: resolve(__dirname, 'events/index.html'),
        gallery: resolve(__dirname, 'gallery/index.html'),
        donate: resolve(__dirname, 'donate/index.html'),
        privacyTerms: resolve(__dirname, 'privacy-terms/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
