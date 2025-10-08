// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import SessionPage from '../pages/SessionPage/SessionPage';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
// 1. Importamos el componente real de EvolutionPage
import EvolutionPage from '../pages/EvolutionPage/EvolutionPage';

import ChallengesPage from '../pages/ChallengesPage/ChallengesPage'; // 1. Importamos

import CommunityPage from '../pages/CommunityPage/CommunityPage'; // 1. Importamos

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* Rutas Protegidas */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/evolution" element={<ProtectedRoute><EvolutionPage /></ProtectedRoute>} />
        <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
        
        {/* 2. Usamos el componente real */}
        <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
        
        <Route path="/session" element={<ProtectedRoute><SessionPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;