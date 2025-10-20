// src/components/common/TraitsExplanation.jsx
import { BookOpenText } from 'lucide-react';

// Componente individual para cada rasgo (Rediseñado)
const TraitCard = ({ traitName, description, iconColor }) => (
  // Card rediseñada con fondo sutil y borde superior
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-current" style={{ borderColor: iconColor }}>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-3">
        {/* Icono con fondo más prominente */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${iconColor}20` }}> {/* Slightly stronger background */}
          <BookOpenText size={24} style={{ color: iconColor }} />
        </div>
        {/* Título más grande */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">{traitName}</h3>
      </div>
      {/* Descripción con mejor espaciado y tamaño */}
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
        {description}
      </p>
    </div>
  </div>
);

// Datos de los rasgos (puedes mover esto a otro archivo si prefieres)
const traitsInfo = [
  { name: 'Apertura', color: '#3b82f6', description: 'Curiosidad intelectual, imaginación y disposición a probar cosas nuevas. Suelen ser creativos y aventureros.' },
  { name: 'Responsabilidad', color: '#8b5cf6', description: 'Nivel de organización, disciplina y fiabilidad. Tienden a ser planificadores y orientados a metas.' },
  { name: 'Extraversión', color: '#ec4899', description: 'Nivel de sociabilidad, energía y asertividad. Disfrutan de la compañía y se recargan con la interacción social.' },
  { name: 'Amabilidad', color: '#10b981', description: 'Tendencia a ser compasivo, cooperativo y considerado. Suelen ser confiados, empáticos y buscan la armonía.' },
  { name: 'Neuroticismo', color: '#f59e0b', description: 'Tendencia a experimentar emociones negativas (ansiedad, tristeza). Puntuaciones bajas indican mayor estabilidad emocional.' }
];

// El componente principal que exportamos
const TraitsExplanation = () => {
  return (
    // Aumentamos el espacio entre las tarjetas
    <div className="space-y-6">
      {traitsInfo.map((trait) => (
        <TraitCard 
          key={trait.name}
          traitName={trait.name}
          description={trait.description}
          iconColor={trait.color}
        />
      ))}
    </div>
  );
};

export default TraitsExplanation;