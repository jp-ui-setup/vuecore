import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import prismjsPlugin from 'vite-plugin-prismjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    prismjsPlugin({
      languages: 'all',
      plugins: ['line-numbers', 'download-button', 'copy-to-clipboard', 'show-language'],
      css: true,
    }),
  ],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
