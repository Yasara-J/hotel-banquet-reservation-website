import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/upload': {
        target: 'https://api.immersity.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/upload/, '/upload')
      }
    }
  }
});
