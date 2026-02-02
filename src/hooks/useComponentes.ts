import { useApi } from './useApi';
import { getComponentes } from '../api/componentes';
import type { Componente } from '../types/api';

export function useComponentes() {
  const {
    data,
    loading,
    error,
    execute,
  } = useApi<Componente[]>(getComponentes);

  return {
    componentes: data ?? [],
    loading,
    error,
    reload: execute,
  };
}
