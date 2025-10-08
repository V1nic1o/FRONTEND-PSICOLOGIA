// src/components/profile/ProfileEditForm.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext/AuthContext';
import api from '../../api/api';
import Loader from '../common/Loader/Loader';
import { UploadCloud } from 'lucide-react';

// Pequeño componente para estandarizar los campos de texto
const FormField = ({ label, type, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      // Clases de estilo corregidas para ambos temas
      className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);


const ProfileEditForm = ({ user, onClose }) => {
  const { triggerRefresh } = useAuth();
  
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : '');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user.profile_image_url);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dateOfBirth', dateOfBirth);
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }

    try {
      await api.put('/profile/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      triggerRefresh();
      onClose();
    } catch (err) {
      setError('No se pudieron guardar los cambios. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">{error}</p>}
      
      {/* Sección de carga de imagen rediseñada */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Foto de Perfil</label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <img src={imagePreview} alt="Vista previa" className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"/>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">?</div>
          )}
          <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/50 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900">
            <UploadCloud size={16} />
            <span>Cambiar foto</span>
          </label>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange}/>
        </div>
      </div>

      {/* Campos de texto ahora 100% verticales */}
      <FormField label="Nombre" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <FormField label="Apellido" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <FormField label="Fecha de Nacimiento" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      
      {/* Botones de acción */}
      <div className="pt-4 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancelar</button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Guardar Cambios</button>
      </div>
    </form>
  );
};

export default ProfileEditForm;