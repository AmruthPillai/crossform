import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  test: {
    globals: false,
    environment: 'node'
  },
  build: {
    target: 'ESNext',
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es', 'umd'],
      name: 'crossform',
      fileName: 'crossform'
    },
    rollupOptions: {
      external: [/^node:.*/]
    }
  },
  plugins: [
    dts({
      exclude: ['./tests/**/*.ts', './vite.config.ts']
    })
  ]
})
