// src/router/ProtectedRoute.jsx (Corregido)
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';
import Loader from '../components/common/Loader/Loader'; // Importamos el Loader

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth(); // 1. Obtenemos el estado de carga

  // 2. Si está verificando el token, mostramos un loader de pantalla completa
  if (loading) {
    return <Loader />;
  }

  // 3. Una vez que termina de cargar, tomamos la decisión
  if (!token) {
    // Si no hay token, ahora sí redirigirá correctamente a la página de inicio
    return <Navigate to="/" />;
  }

  // Si hay token, mostrar el contenido
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default ProtectedRoute;