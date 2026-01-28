import { apiFetch } from './client';

type AsignarComponentePayload = {
  equipoId: number;
  componenteId: number;
  cantidad: number;
};

export const asignarComponenteAEquipo = (
  payload: AsignarComponentePayload
): Promise<void> => {
  return apiFetch<void>('/equipo-componente', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
