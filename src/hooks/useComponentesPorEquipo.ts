import { useEffect, useState } from 'react';
import { getEquipoComponentes, EquipoComponente } from '../api/componentes';

export function useComponentesPorEquipo(equipoId: number) {
  const [componentes, setComponentes] = useState<EquipoComponente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    getEquipoComponentes()
      .then((all) => {
        if (!mounted) return;

        const filtrados = all.filter(
          (ec) => ec.equipo_id === equipoId
        );

        setComponentes(filtrados);
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message ?? 'Error al cargar componentes');
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [equipoId]);

  return {
    componentes,
    loading,
    error,
  };
}
