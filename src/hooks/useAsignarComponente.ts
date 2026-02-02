import { useApi } from './useApi';
import { asignarComponenteAEquipo } from '../api/equipoComponentes';

type Payload = {
  equipoId: number;
  componenteId: number;
  cantidad: number;
};

export function useAsignarComponente(payload: Payload | null) {
  const {
    loading,
    error,
    execute,
  } = useApi<void>(() => {
    if (!payload) {
      return Promise.reject('Payload no definido');
    }
    return asignarComponenteAEquipo(payload);
  });

  return {
    asignar: execute,
    loading,
    error,
  };
}
