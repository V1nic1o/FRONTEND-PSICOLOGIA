// src/components/auth/RegisterForm.jsx
import { useState } from 'react';
import api from '../../api/api';
import Loader from '../common/Loader/Loader';

// Añadimos una prop para poder cambiar al modal de login
const RegisterForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/auth/register', { email, password });
      setSuccess('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar la cuenta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  // Si el registro fue exitoso, mostramos un mensaje y un botón para ir a login
  if (success) {
    return (
      <div className="text-center">
        <p className="p-3 text-sm text-green-800 bg-green-100 rounded-lg mb-4">{success}</p>
        <button
          onClick={onSwitchToLogin}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Ir a Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Contraseña</label>
        <input 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Crear Cuenta
        </button>
      </div>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        ¿Ya tienes una cuenta?{' '}
        <button type="button" onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:underline">
          Inicia sesión
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;