import { useEffect, useState } from 'react';
import { getEquipos } from '../api/equipos';
import { Equipo } from '../types/api';

export function useEquipos() {
  const [data, setData] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getEquipos()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return {
    equipos: data,
    loading,
    error,
    reload: load,
  };
}
