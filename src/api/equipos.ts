import { apiFetch } from './client';
import { Equipo } from '../types/api';

export const getEquipos = () => {
  return apiFetch<Equipo[]>('/equipos');
};

export const getEquipoById = (id: number) => {
  return apiFetch<Equipo>(`/equipos/${id}`);
};
