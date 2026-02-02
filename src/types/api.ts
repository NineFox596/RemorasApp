export interface Equipo {
  id: number;
  estado: string;
  departamento: string;
  departamento_id: number;

  usuario_id: number;

  usuario?: {
    id: number;
    nombre: string;
    departamento_id: number;
  };
}



export interface Usuario {
  id: number;
  nombre: string;
  rut: string | null;
  departamento_id: number;
  departamento: string;
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
