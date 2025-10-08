// src/components/common/DashboardCard.jsx
const DashboardCard = ({ title, icon, children, className }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 ${className}`}>
      {/* Encabezado de la tarjeta */}
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
      </div>
      {/* Contenido de la tarjeta */}
      <div>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;