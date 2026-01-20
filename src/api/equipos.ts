import { apiFetch } from './client';
import { Equipo } from '../types/api';

export const getEquipos = () =>
  apiFetch<Equipo[]>('/api/equipos');

export const getEquipoById = (id: number) =>
  apiFetch<Equipo>(`/api/equipos/${id}`);
