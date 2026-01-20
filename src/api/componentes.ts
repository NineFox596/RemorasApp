import { apiFetch } from './client';
import { Componente } from '../types/api';

export const getComponentes = () =>
  apiFetch<Componente[]>('/api/componentes');

export const getComponenteById = (id: number) =>
  apiFetch<Componente>(`/api/componentes/${id}`);

export interface EquipoComponente {
  equipo_id: number;
  componente_id: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  descripcion: string;
}

export const getEquipoComponentes = () => {
  return apiFetch<EquipoComponente[]>('/api/equipo-componentes');
};