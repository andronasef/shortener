import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [svelte(), Icons({
    compiler: 'svelte',
  }),
  ]
})
