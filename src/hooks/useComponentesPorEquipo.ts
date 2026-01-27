// src/hooks/useComponentesPorEquipo.ts
import { useEffect, useState } from 'react';
import { getEquipoComponentes, EquipoComponente } from '../api/componentes';

export function useComponentesPorEquipo(equipoId: number) {
  const [data, setData] = useState<EquipoComponente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getEquipoComponentes()
      .then((all) => {
        const filtrados = all.filter(
          (ec) => ec.equipo_id === equipoId
        );
        setData(filtrados);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [equipoId]);

  return { componentes: data, loading, error };
}
