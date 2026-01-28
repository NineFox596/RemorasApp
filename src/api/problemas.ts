import { apiFetch } from './client';
import { Problema } from '../types/api';

export const getProblemas = () => {
  return apiFetch<Problema[]>('/problemas');
};

export const getProblemaById = (id: number) => {
  return apiFetch<Problema>(`/problemas/${id}`);
};

export const solucionarProblema = (id: number) => {
  return apiFetch(`/problemas/${id}/solucionar`, {
    method: 'PUT',
  });
};

export const reportarProblemaEquipo = (
  equipoId: number,
  descripcion: string
) => {
  return apiFetch(`/problemas/equipo/${equipoId}`, {
    method: 'POST',
    body: JSON.stringify({ descripcion }),
  });
};
