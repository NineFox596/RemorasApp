import { useApi } from './useApi';
import {
  crearEquipo,
  actualizarEquipo,
  EquipoPayload,
} from '../api/equipos';
import type { Equipo } from '../types/api';

export function useEquipoForm(
  equipoId?: number,
  payload?: EquipoPayload
) {
  const isEdit = typeof equipoId === 'number';

  const {
    data,
    loading,
    error,
    execute,
  } = useApi<Equipo>(() => {
    if (!payload) {
      return Promise.reject('Payload no definido');
    }

    return isEdit
      ? actualizarEquipo(equipoId!, payload)
      : crearEquipo(payload);
  });

  return {
    equipo: data,
    loading,
    error,
    guardar: execute,
    isEdit,
  };
}
