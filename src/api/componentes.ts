import { apiFetch } from './client';

export interface EquipoComponente {
  equipo_id: number;
  componente_id: number;
  nombre: string;
  tipo: string;
  cantidad: number;
  descripcion: string;
}

export const getEquipoComponentes = () => {
  return apiFetch<EquipoComponente[]>('/equipo-componentes');
};
