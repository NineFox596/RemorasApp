import { apiFetch } from './client';
import { Problema } from '../types/api';

export const getProblemas = () =>
  apiFetch<Problema[]>('/api/problemas');

export const getProblemaById = (id: number) =>
  apiFetch<Problema>(`/api/problemas/${id}`);

export const solucionarProblema = (id: number) =>
  apiFetch(`/api/problemas/${id}/solucionar`, {
    method: 'PUT',
  });
