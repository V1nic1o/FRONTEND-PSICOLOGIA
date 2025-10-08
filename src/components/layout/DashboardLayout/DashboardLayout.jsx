// src/components/layout/DashboardLayout.jsx
import BottomNav from '../BottomNav/BottomNav';
import InnerHeader from '../InnerHeader/InnerHeader';

const DashboardLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col">
      {/* Header fijo arriba */}
      <div className="sticky top-0 z-20">
        <InnerHeader />
      </div>

      {/* Contenido scrollable */}
      <main className="flex-1 overflow-y-auto pb-20 px-4 sm:px-6">
        {children}
      </main>

      {/* Barra inferior fija */}
      <div className="fixed bottom-0 left-0 right-0 z-30">
        <BottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;