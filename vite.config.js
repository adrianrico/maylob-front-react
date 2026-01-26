import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/* export default defineConfig({
  plugins: [react()],
})
 */

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests that start with '/api'
      '/api': {
        target: 'http://127.0.0.1:8080', // Your backend server address
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the URL by removing /api prefix
      },
    },
  },
});