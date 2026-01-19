import { useEffect, useState } from 'react';
import { getEquipos } from '../api/equipos';
import { Equipo } from '../types/api';

export function useEquipos() {
  const [data, setData] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEquipos()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { equipos: data, loading, error };
}
