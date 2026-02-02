import { useApi } from './useApi';
import { solucionarProblema } from '../api/problemas';
import type { Problema } from '../types/api';

export function useSolucionarProblema(problemaId: number | null) {
  const {
    data,
    loading,
    error,
    execute,
  } = useApi<Problema>(() => {
    if (!problemaId) {
      return Promise.reject('ID no definido');
    }
    return solucionarProblema(problemaId);
  });

  return {
    problema: data,
    loading,
    error,
    solucionar: execute,
  };
}
