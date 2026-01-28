import { useEffect, useState } from 'react';
import { getUsuarios } from '../api/usuarios';
import type { Usuario } from '../types/api';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    getUsuarios()
      .then(res => {
        setUsuarios(res);
      })
  }, []);

  return { usuarios };
}
