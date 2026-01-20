export interface Equipo {
  id: number;
  estado: string;
  departamento: string;
  ubicacion: string;
}

export interface Problema {
  id: number;
  descripcion: string;
  fecha_informado: string;
  reparado: boolean;
  fecha_solucion: string | null;
  equipo_id: number;
  equipo_nombre: string;
}

export interface Componente {
  id: number;
  nombre: string;
  tipo: string;
}
