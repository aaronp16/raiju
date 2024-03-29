import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
  },
  optimizeDeps: {
    include: ['@raiju/types'],
  },
  build: {
    commonjsOptions: {
      include: ['@raiju/types', /node_modules/],
    },
  },
  cacheDir: '.vite_cache',
});
