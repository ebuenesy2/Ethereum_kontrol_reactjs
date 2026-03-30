import { create } from 'zustand';

export const useUiStore = create((set) => ({
  theme: 'light',
  loading: false,
  toast: null,

  setTheme: (theme) => set({ theme }),
  setLoading: (loading) => set({ loading }),
  setToast: (toast) => set({ toast }),
}));
