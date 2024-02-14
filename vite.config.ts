import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    target: 'ESNext',
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es', 'umd'],
      name: 'crossform'
    },
    rollupOptions: {
      external: [/^node:.*/]
    }
  },
  plugins: [
    dts({
      exclude: ['./tests/**/*.ts']
    })
  ]
})