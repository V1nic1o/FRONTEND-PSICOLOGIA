// src/pages/SessionPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Loader from '../../components/common/Loader/Loader';
import { useAuth } from '../../context/AuthContext/AuthContext';
import FeedbackModal from '../../components/session/FeedbackModal/FeedbackModal';
import Confetti from 'react-confetti';
import { ArrowRight, Check } from 'lucide-react';

const SessionPage = () => {
  const [dilemmas, setDilemmas] = useState([]);
  const [totalDilemmas, setTotalDilemmas] = useState(0);
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const navigate = useNavigate();
  const { triggerRefresh } = useAuth();

  useEffect(() => {
    const fetchDilemmas = async () => {
      try {
        setLoading(true);
        const response = await api.get('/dilemmas/daily');
        const pending = response.data.pendingDilemmas;

        if (pending && pending.length > 0) {
          setDilemmas(pending);
          setTotalDilemmas(response.data.totalCount);
        } else {
          setSessionComplete(true);
        }
      } catch (err) {
        setError('No se pudieron cargar los dilemas. Intenta de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDilemmas();
  }, []);

  const handleAnswer = async (dilemmaId, optionId) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/dilemmas/answer', { dilemmaId, optionId });
      setFeedbackText(response.data.feedback);
      setShowFeedback(true);
    } catch (err) {
      setError('Hubo un error al procesar tu respuesta.');
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const goToNextStep = () => {
    setShowFeedback(false);
    
    // =======================================================
    // 🚀 CORRECCIÓN CLAVE: 
    // Llamamos a triggerRefresh() para que el AuthContext recargue 
    // el perfil con los nuevos rasgos ANTES de pasar al siguiente dilema.
    triggerRefresh(); 
    // =======================================================

    const nextIndex = currentDilemmaIndex + 1;
    if (nextIndex < dilemmas.length) {
      setCurrentDilemmaIndex(nextIndex);
    } else {
      setSessionComplete(true);
    }
    setIsSubmitting(false);
  };

  const handleGoToDashboard = () => {
    // Si bien también se llama aquí, la corrección asegura que
    // el perfil esté actualizado incluso si la sesión no termina.
    triggerRefresh(); 
    navigate('/dashboard');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in relative overflow-hidden">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={250}
          gravity={0.1}
        />
        
        <div className="max-w-xl">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Check size={64} className="text-white" strokeWidth={3} />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-gray-800 dark:text-white mb-4">
            ¡Misión Cumplida!
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 font-normal leading-relaxed">
            Has completado tu sesión de hoy. Cada decisión te acerca más a entenderte a ti mismo.
          </p>
          
          <button 
            onClick={handleGoToDashboard}
            className="px-8 py-4 font-bold text-white bg-gray-800 rounded-full shadow-lg dark:bg-white dark:text-gray-900
                       transform hover:scale-105 transition-transform duration-300 focus:outline-none 
                       focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-gray-300/50"
          >
            Ver mi Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentDilemma = dilemmas[currentDilemmaIndex];
  const progressPercentage = totalDilemmas > 0 ? ((currentDilemmaIndex + 1) / totalDilemmas) * 100 : 0;

  return (
    // Se eliminan las clases de centrado para que el contenido fluya naturalmente dentro del layout
    <div className="h-full p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto animate-fade-in">
        
        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Progreso de la Sesión</span>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{currentDilemmaIndex + 1} / {totalDilemmas}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Pregunta */}
        <div className="text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-10 leading-tight">
            {currentDilemma.question_text}
          </p>
        </div>
        
        {/* Llamado a la acción */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Elige una opción:
          </h3>
        </div>

        <div className="space-y-4">
          {currentDilemma.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(currentDilemma.id, option.id)}
              disabled={isSubmitting}
              className="group w-full text-left p-5 rounded-xl bg-white dark:bg-gray-800 border-2 border-transparent shadow-md transition-all duration-200 ease-in-out flex items-center gap-4 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-bold">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1 font-semibold text-lg text-gray-800 dark:text-gray-200">{option.text}</span>
              <ArrowRight size={20} className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
      
      {isSubmitting && <div className="fixed inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm z-50"></div>}

      <FeedbackModal 
        isOpen={showFeedback}
        feedback={feedbackText}
        onContinue={goToNextStep}
      />
    </div>
  );
};
export default SessionPage;