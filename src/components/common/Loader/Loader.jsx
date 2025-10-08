// src/components/common/Loader.jsx
import Lottie from 'lottie-react';
import loaderAnimation from '../../../assets/animations/loader.json';

const Loader = () => {
  const style = {
    // 1. Aumentamos el tamaño al doble (de 200 a 400)
    height: 400, 
  };

  return (
    // 2. Quitamos la transparencia (/80) y el efecto de desenfoque (backdrop-blur-sm)
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      
      <div className="flex flex-col items-center">
        <Lottie animationData={loaderAnimation} style={style} />
        {/* 3. Aumentamos el tamaño del texto al doble (de text-lg a text-4xl) y ajustamos el margen */}
        <p className="text-4xl font-medium text-gray-600 dark:text-gray-400 -mt-8">
          Cargando...
        </p>
      </div>

    </div>
  );
};

export default Loader;