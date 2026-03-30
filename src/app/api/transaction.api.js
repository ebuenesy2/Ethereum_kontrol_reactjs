// apps/web/src/app/api/transaction.api.js
import { apiClient } from './client';

function buildUrlWithParams(url, params) {
  const queryString = new URLSearchParams(params).toString();
  return `${url}?${queryString}`;
}

export const transactionApi = {
  list: (params) => apiClient(buildUrlWithParams('/transaction', params)),
  filtre: (searchName) => apiClient(`/transaction/filtre/name/${searchName}`),
};
