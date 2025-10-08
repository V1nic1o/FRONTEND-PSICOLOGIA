// src/components/dashboard/DilemmasWidget.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Play, CheckCircle2 } from 'lucide-react';
import api from '../../../api/api';
import DashboardCard from '../../common/DashboardCard/DashboardCard';
import Loader from '../../common/Loader/Loader';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import useCountdown from '../../../hooks/useCountdown'; // 1. Importamos el nuevo hook

const DilemmasWidget = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { refreshTrigger } = useAuth();
  const countdown = useCountdown(); // 2. Usamos el hook

  useEffect(() => {
    const fetchDilemmasStatus = async () => {
      try {
        setLoading(true);
        const response = await api.get('/dilemmas/daily');
        setPendingCount(response.data.pendingDilemmas.length);
        setTotalCount(response.data.totalCount);
      } catch (err) {
        setError('No se pudo verificar el estado de tu sesión.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDilemmasStatus();
  }, [refreshTrigger]);

  const handleStartSession = () => {
    navigate('/session');
  };

  const renderContent = () => {
    if (loading) {
      return <div className="h-48 flex items-center justify-center"><Loader /></div>;
    }
    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (pendingCount === 0 && totalCount > 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-48">
          <CheckCircle2 size={48} className="text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">¡Sesión Completada!</h3>
          {/* 3. Mostramos el contador regresivo */}
          <p className="text-gray-600 dark:text-gray-300">
            Nuevos dilemas en: <span className="font-mono font-semibold">{countdown}</span>
          </p>
        </div>
      );
    }
    
    if (totalCount === 0) {
      return (
         <div className="flex flex-col items-center justify-center text-center h-48">
            <p className="text-gray-600 dark:text-gray-300">No hay dilemas disponibles por el momento.</p>
        </div>
      )
    }

    return (
      <div className="grid md:grid-cols-2 items-center gap-6">
        <div className="space-y-3 text-left">
          <p className="text-gray-600 dark:text-gray-300">
            Estás listo para tu sesión. Tienes {pendingCount} nuevas situaciones esperándote.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Completado: {totalCount - pendingCount} / {totalCount}
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <button 
            onClick={handleStartSession}
            className="group flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            aria-label="Comenzar Sesión"
          >
            <Play size={40} className="text-white transform transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <DashboardCard
      title="Tus Dilemas de Hoy"
      icon={<Brain size={28} className="text-blue-500" />}
      className="w-full"
    >
      {renderContent()}
    </DashboardCard>
  );
};

export default DilemmasWidget;