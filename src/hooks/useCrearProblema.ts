import { useApi } from './useApi';
import { crearProblema } from '../api/problemas';
import type { Problema } from '../types/api';

type CrearProblemaPayload = {
  equipoId: number;
  descripcion: string;
};

export function useCrearProblema(payload: CrearProblemaPayload | null) {
  const {
    data,
    loading,
    error,
    execute,
  } = useApi<Problema>(() => {
    if (!payload) {
      return Promise.reject('Payload no definido');
    }
    return crearProblema(payload);
  });

  return {
    problema: data,
    loading,
    error,
    crear: execute,
  };
}
