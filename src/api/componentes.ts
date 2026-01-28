import { apiFetch } from './client';
import type { Componente } from '../types/api';

export interface EquipoComponente {
  equipo_id: number;
  componente_id: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  descripcion: string;
}

/** Componentes asignados a equipos */
export const getEquipoComponentes = () => {
  return apiFetch<EquipoComponente[]>('/equipo-componentes');
};

/** Componentes disponibles */
export const getComponentes = () => {
  return apiFetch<Componente[]>('/componentes');
};
