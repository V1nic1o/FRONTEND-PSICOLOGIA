// src/pages/ChallengesPage.jsx
import { useEffect, useState } from 'react';
import { ShieldCheck, Target, Award } from 'lucide-react';
import api from '../../api/api';
import Loader from '../../components/common/Loader/Loader';

const ChallengeCard = ({ challenge, onToggle, isCompleted }) => (
  <div 
    onClick={onToggle}
    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
      isCompleted 
        ? 'bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700' 
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg'
    }`}
  >
    {isCompleted && (
      <Award size={100} className="absolute -right-4 -bottom-4 text-green-500/20" />
    )}
    <div className="relative z-10">
      <div className="flex items-center gap-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
          isCompleted ? 'bg-green-500' : 'bg-amber-100 dark:bg-amber-900/50'
        }`}>
          <Target size={24} className={isCompleted ? 'text-white' : 'text-amber-600 dark:text-amber-400'} />
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-lg text-gray-800 dark:text-gray-100 ${isCompleted && 'line-through text-gray-500 dark:text-gray-500'}`}>
            {challenge.title}
          </h3>
          <p className={`text-gray-600 dark:text-gray-400 mt-1 ${isCompleted && 'text-gray-500 dark:text-gray-500'}`}>
            {challenge.description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const completedCount = Object.values(completedChallenges).filter(Boolean).length;
  const totalCount = challenges.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  useEffect(() => {
    // --- INICIO DE LA CORRECCIÓN ---
    // Restauramos la lógica completa para buscar los datos en el backend
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        const response = await api.get('/challenges/personal');
        setChallenges(response.data.challenges);
      } catch (err) {
        setError("No se pudieron cargar tus retos personales.");
        console.error("Error al obtener los retos:", err);
      } finally {
        setLoading(false);
      }
    };
    // --- FIN DE LA CORRECCIÓN ---
    fetchChallenges();
  }, []);

  const toggleChallenge = (index) => {
    setCompletedChallenges(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    
    if (totalCount === 0) {
      // Restauramos también el mensaje para cuando no hay retos
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
          <ShieldCheck size={48} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">¡Todo en Orden!</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">No tienes nuevos retos asignados por ahora.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {challenges.map((challenge, index) => (
          <ChallengeCard 
            key={index} 
            challenge={challenge}
            isCompleted={!!completedChallenges[index]}
            onToggle={() => toggleChallenge(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Tus Misiones Semanales</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Cada reto completado es un paso adelante en tu viaje de autoconocimiento.
        </p>
        
        {/* Solo mostramos la barra de progreso si hay retos */}
        {totalCount > 0 && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Progreso</span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{completedCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ChallengesPage;