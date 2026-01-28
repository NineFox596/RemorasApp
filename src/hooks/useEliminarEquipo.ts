import { useApi } from './useApi';
import { eliminarEquipo } from '../api/equipos';

export function useEliminarEquipo(equipoId: number) {
  const {
    loading,
    error,
    execute,
  } = useApi<void>(() => eliminarEquipo(equipoId));

  return {
    eliminar: execute,
    loading,
    error,
  };
}
