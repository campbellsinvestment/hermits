import { defineConfig } from 'vite'

export default defineConfig({
  base: '/hermits/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: true
  }
})
