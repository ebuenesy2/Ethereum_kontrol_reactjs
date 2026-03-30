// apps/web/src/app/api/client.js
import { env } from '../config/env';

export async function apiClient(path, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem('token') || null;
  console.log('API Client called with:', { path, method, body, headers, token });

  const res = await fetch(`${env.API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.API_KEY,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  console.log('Clientjs data:', data);

  if (!res.ok) {
    const errorMessage = data?.message || data?.error || `HTTP ${res.status}`;
    throw new Error(errorMessage);
  }

  return data;
}
