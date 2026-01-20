import { useEffect, useState } from 'react';
import { getProblemas } from '../api/problemas';
import { Problema } from '../types/api';

export function useProblemas() {
  const [data, setData] = useState<Problema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getProblemas()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return {
    problemas: data,
    loading,
    error,
    reload: load,
  };
}
