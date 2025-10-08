// src/components/welcome/FeaturesSection.jsx
import { BrainCircuit, Users, TrendingUp } from 'lucide-react';

// 1. Importa tus ilustraciones aquí
import ArchetypeIllustration from '../../../assets/archetype-illustration.svg'; 
import ProgressIllustration from '../../../assets/progress-illustration.svg';   
import CommunityIllustration from '../../../assets/community-illustration.svg'; 

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 w-full overflow-hidden">
      <div className="container mx-auto px-6 space-y-24">

        {/* --- CARACTERÍSTICA 1: ARQUETIPOS DINÁMICOS --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/50 dark:text-blue-300">
              <BrainCircuit size={20} />
              <span className="font-semibold">Personalización Profunda</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Descubre tu Arquetipo</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Más allá de los números, nuestra IA interpreta tu perfil para asignarte un arquetipo dinámico como "El Visionario Creativo". Entiende tus superpoderes y áreas de crecimiento de una forma humana y reveladora.
            </p>
          </div>
          <div className="flex items-center justify-center">
            {/* 2. Reemplaza el marcador de posición con la etiqueta <img> */}
            <img 
              src={ArchetypeIllustration} 
              alt="Ilustración de Arquetipos de Personalidad" 
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>

        {/* --- CARACTERÍSTICA 2: SEGUIMIENTO DE PROGRESO --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center md:order-last">
            <img 
              src={ProgressIllustration} 
              alt="Ilustración de Gráficos de Progreso" 
              className="w-full max-w-md h-auto"
            />
          </div>
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-purple-700 bg-purple-100 rounded-full dark:bg-purple-900/50 dark:text-purple-300">
              <TrendingUp size={20} />
              <span className="font-semibold">Evolución Continua</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Visualiza tu Crecimiento</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Observa cómo tus rasgos de personalidad evolucionan semana a semana. Nuestra plataforma guarda tu progreso para que veas el impacto real de tu autoconocimiento en un gráfico claro y motivador.
            </p>
          </div>
        </div>

        {/* --- CARACTERÍSTICA 3: CONTEXTO COMUNITARIO --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-teal-700 bg-teal-100 rounded-full dark:bg-teal-900/50 dark:text-teal-300">
              <Users size={20} />
              <span className="font-semibold">Perspectiva Global</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Entiende tu Lugar</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Compara tus rasgos de forma anónima con el resto de la comunidad. Descubre qué tan común es tu arquetipo y en qué percentil te encuentras, dándote un contexto fascinante sobre tu individualidad.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src={CommunityIllustration} 
              alt="Ilustración de Comunidad de Usuarios" 
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;