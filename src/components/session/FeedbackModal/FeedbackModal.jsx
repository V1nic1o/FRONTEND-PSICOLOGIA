// src/components/session/FeedbackModal.jsx
import { Sparkles, ArrowRight } from 'lucide-react';

const FeedbackModal = ({ isOpen, feedback, onContinue }) => {
  if (!isOpen) return null;

  return (
    // 1. Capa de fondo que cubre toda la pantalla
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-fade-in">
      
      {/* 2. El "Modal" rediseñado: ya no es una simple caja blanca */}
      <div className="relative w-full max-w-lg p-1 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-[15px] p-8 text-center">
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
              <Sparkles size={32} className="text-blue-500" />
            </div>
          </div>

          {/* 3. Título en español */}
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Análisis Revelado
          </h2>

          {/* 4. Mensaje de Feedback con nueva tipografía y estilo */}
          <blockquote className="border-l-4 border-blue-500 pl-4 mb-8">
            <p className="text-xl italic text-gray-700 dark:text-gray-200 font-serif leading-relaxed">
              {feedback}
            </p>
          </blockquote>
          
          <button
            onClick={onContinue}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
          >
            Continuar <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;