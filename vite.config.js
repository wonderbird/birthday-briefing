import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Include specific Node.js modules required by tsdav
      include: ['stream', 'buffer', 'util', 'process'],
      // Enable global shims for Node.js globals
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
})
