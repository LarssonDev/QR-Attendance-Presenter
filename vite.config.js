import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/QR-Attendance-Presenter/', // Set the correct base path for deployment
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@babel/runtime']
  }
});
