import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [vue(), VueRouter()],
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
