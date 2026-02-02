import { useEffect, useState } from 'react';
import { getEquipos } from '../api/equipos';
import { Equipo } from '../types/api';

export function useEquipos() {
  const [data, setData] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipos = async () => {
    try {
      setLoading(true);
      setError(null);

      const equipos = await getEquipos();
      setData(equipos);
    } catch (err: any) {
      setError(err.message || 'Error al cargar equipos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  return {
    equipos: data,
    loading,
    error,
    refetch: fetchEquipos, // 👈 ESTO ES LO IMPORTANTE
  };
}
