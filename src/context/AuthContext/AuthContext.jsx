// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import api from '../../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const response = await api.get('/profile/me');
          
          // --- INICIO DE LA CORRECCIÓN ---
          // Combinamos los datos del perfil y el arquetipo en un solo objeto de usuario plano
          setUser({ ...response.data.profileData, archetype: response.data.archetype }); 
          // --- FIN DE LA CORRECCIÓN ---

        } catch (error) {
          console.error("Token inválido o expirado, cerrando sesión.");
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [refreshTrigger]);

  const login = async (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    try {
      const response = await api.get('/profile/me');

      // --- INICIO DE LA CORRECCIÓN ---
      // Hacemos lo mismo aquí para consistencia
      setUser({ ...response.data.profileData, archetype: response.data.archetype });
      // --- FIN DE LA CORRECCIÓN ---

    } catch (error) {
      console.error("No se pudo obtener el perfil después del login", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const authContextValue = {
    token,
    user,
    loading,
    login,
    logout,
    triggerRefresh,
  };

  if (loading && !token) {
    return null; 
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};