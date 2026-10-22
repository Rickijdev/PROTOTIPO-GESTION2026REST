import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' permite desplegar en cualquier repositorio de GitHub Pages
// (ej. https://usuario.github.io/nombre-repo/) sin rutas rotas.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
  },
});
