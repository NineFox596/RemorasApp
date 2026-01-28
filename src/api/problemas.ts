import { apiFetch } from './client';
import { Problema } from '../types/api';

type CrearProblemaPayload = {
  equipoId: number;
  descripcion: string;
};

export const getProblemas = () => {
  return apiFetch<Problema[]>('/problemas');
};

export const getProblemaById = (id: number) => {
  return apiFetch<Problema>(`/problemas/${id}`);
};

export const crearProblema = (payload: CrearProblemaPayload) => {
  return apiFetch<Problema>('/problemas', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const solucionarProblema = (problemaId: number) => {
  return apiFetch<Problema>(`/problemas/${problemaId}/solucionar`, {
    method: 'PUT',
  });
};

