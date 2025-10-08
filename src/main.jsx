// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter'; // Importamos el Router
import { AuthProvider } from './context/AuthContext/AuthContext';
import './styles/index.css';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';

// --- INICIO DE LA IMPLEMENTACIÓN PWA ---
// 1. Importar la función de registro del Service Worker
import { registerSW } from 'virtual:pwa-register';

// 2. Ejecutar el registro inmediatamente
// Esto le dice al navegador que instale y use el Service Worker
registerSW({ immediate: true }); 
// --- FIN DE LA IMPLEMENTACIÓN PWA ---


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider> {/* Envolvemos el router */}
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);