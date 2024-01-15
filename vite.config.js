import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  root: 'src/',
  publicDir: '../public/',
  base: './',
  server: { host: true },
  build:
  {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true
  }
})