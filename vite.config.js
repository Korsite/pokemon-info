import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  define: {
    'process.env': {},
    Buffer: 'globalThis.Buffer', // o 'self.Buffer' dependiendo del entorno
  },
})
