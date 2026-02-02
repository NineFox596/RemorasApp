const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('EXPO_PUBLIC_API_URL no está definida en el .env');
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        text || 'Error en el servidor'
      );
    }

    return response.json();
  } catch (error: any) {
    if (error.message === 'Network request failed') {
      throw new Error(
        'No hay conexión con el servidor. Revisa tu conexión a internet.'
      );
    }

    throw error;
  }
}
