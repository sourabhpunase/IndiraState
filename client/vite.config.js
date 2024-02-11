import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },

  plugins: [react()],

  build: {
    rollupOptions: {
      // Make sure to add 'react-icons/fa' to the external dependencies
      external: ['react-icons/fa'],
    },
  },
});