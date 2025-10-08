// src/hooks/useCountdown.js
import { useEffect, useState } from 'react';

const useCountdown = () => {
  const getTargetDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Medianoche del día siguiente
    return tomorrow;
  };

  const [targetDate, setTargetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = targetDate - new Date();
      if (newTimeLeft <= 0) {
        // Si el tiempo llega a cero, reseteamos para el día siguiente
        setTargetDate(getTargetDate());
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval);
  }, [targetDate]);

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Añadimos un '0' al principio si el número es menor a 10
  const format = (num) => num.toString().padStart(2, '0');

  return `${format(hours)}h ${format(minutes)}m ${format(seconds)}s`;
};

export default useCountdown;