import { useApi } from './useApi';
import { getEquipoComponentes, EquipoComponente } from '../api/componentes';

export function useComponentesPorEquipo(equipoId: number) {
  const {
    data,
    loading,
    error,
    execute,
  } = useApi<EquipoComponente[]>(async () => {
    const all = await getEquipoComponentes();
    return all.filter(
      (ec) => ec.equipo_id === equipoId
    );
  });

  return {
    componentes: data ?? [],
    loading,
    error,
    reload: execute,
  };
}
