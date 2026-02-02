import { apiFetch } from './client';
import { Equipo } from '../types/api';

// Obtener todos los equipos
export const getEquipos = () => {
  return apiFetch<Equipo[]>('/equipos');
};

// Obtener un equipo por ID
export const getEquipoById = (id: number) => {
  return apiFetch<Equipo>(`/equipos/${id}`);
};

// Crear un nuevo equipo
export const crearEquipo = (equipo: {
  usuario_id: number;
  departamento_id: number;
}) => {
  return apiFetch('/equipos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipo),
  });
};

// Actualizar un equipo existente
export const actualizarEquipo = (
  id: number,
  equipo: {
    estado: string;
    usuario_id: number;
    departamento_id: number;
  }
) => {
  return apiFetch(`/equipos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipo),
  });
};



// Eliminar un equipo
export const eliminarEquipo = (id: number) => {
  return apiFetch(`/equipos/${id}`, {
    method: 'DELETE',
  });
};
