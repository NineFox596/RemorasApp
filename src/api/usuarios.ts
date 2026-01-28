import { apiFetch } from './client';
import { Usuario } from '../types/api';

// Obtener todos los usuarios
export const getUsuarios = () => apiFetch<Usuario[]>('/usuarios');

// Obtener un usuario por id
export const getUsuarioById = (id: number) => apiFetch<Usuario>(`/usuarios/${id}`);

// Crear un usuario (ajustado a la API)
export const crearUsuario = (usuario: {
  nombre: string;
  rut: string;
  departamento_id: number;
}) => {
  return apiFetch<Usuario>('/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });
};
