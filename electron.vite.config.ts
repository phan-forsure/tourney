<<<<<<< HEAD
// @ts-expect-error // no types for electron-vite
=======
// @ts-expect-error - no types for this plugin yet
>>>>>>> 3cd4a1e6fd02b004c2f6114f46cac0a5070e17b3
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react(), tailwindcss()],
  },
})
