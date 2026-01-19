import { apiFetch } from './client';
import { Componente } from '../types/api';

export const getComponentes = () =>
  apiFetch<Componente[]>('/api/componentes');

export const getComponenteById = (id: number) =>
  apiFetch<Componente>(`/api/componentes/${id}`);
