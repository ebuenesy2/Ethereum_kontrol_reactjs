// apps/web/src/app/api/auth.api.js
import { apiClient } from './client';

function buildUrlWithParams(url, params) {
  const queryString = new URLSearchParams(params).toString();
  return `${url}?${queryString}`;
}

export const authApi = {
  login: (payload) => {
    return apiClient('/users/login', {
      method: 'POST',
      body: payload,
    });
  },

  me: (params) => apiClient(buildUrlWithParams('/users/me', params)),
};
