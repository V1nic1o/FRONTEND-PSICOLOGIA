// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // <-- Importación necesaria

// Configuración del Manifiesto PWA
const manifestForPlugin = {
  // Configura dónde se encontrarán los archivos estáticos PWA
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'logo-192.png', 'logo-512.png'], 
  
  // Definición del archivo manifest.json
  manifest: {
    name: 'Inner Journey App', 
    short_name: 'Journey', 
    description: 'Tu aplicación de autodescubrimiento y personalidad.',
    theme_color: '#1e3a8a', 
    background_color: '#ffffff', 
    display: 'standalone', 
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: '/logo-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/logo-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
};


export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugin) // <-- ¡Añadimos el plugin PWA!
  ],
});