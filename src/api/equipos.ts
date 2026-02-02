import { apiFetch } from './client';
import type { Equipo } from '../types/api';

export type EquipoPayload = {
  departamento: string;
  ubicacion: string;
  estado: string;
};

/* ===== Lectura ===== */

export const getEquipos = () => {
  return apiFetch<Equipo[]>('/equipos');
};

export const getEquipoById = (id: number) => {
  return apiFetch<Equipo>(`/equipos/${id}`);
};

/* ===== Escritura ===== */

export const crearEquipo = (payload: EquipoPayload) => {
  return apiFetch<Equipo>('/equipos', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const actualizarEquipo = (
  equipoId: number,
  payload: EquipoPayload
) => {
  return apiFetch<Equipo>(`/equipos/${equipoId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const eliminarEquipo = (equipoId: number) => {
  return apiFetch<void>(`/equipos/${equipoId}`, {
    method: 'DELETE',
  });
};
