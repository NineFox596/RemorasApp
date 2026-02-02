import { useCallback, useState } from 'react';

export function useApi<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fn();
      setData(res);
    } catch (err: any) {
      setError(err.message ?? 'Error en la API');
    } finally {
      setLoading(false);
    }
  }, [fn]);

  return { data, loading, error, execute };
}
