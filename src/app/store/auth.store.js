//! apps/web/src/app/store/auth.store.js
import { create } from 'zustand';
import { authApi } from '../api/auth.api';

export const useAuthStore = create((set) => ({
  error: null,
  create: false,
  loading: false,

  user_email: localStorage.getItem('email') || '',
  token: localStorage.getItem('token') || '',

  error_verify: null,

  login: async (payload) => {
    //console.log('Auth Store login called with:', payload);

    localStorage.removeItem('email');
    localStorage.removeItem('token');

    set({ loading: true, error: null, token: null });

    try {
      const res = await authApi.login(payload);
      console.log('Login response:', res);

      localStorage.setItem('email', res.data.email);
      localStorage.setItem('token', res.token);

      set({
        token: res.token,
        user_email: res.data.email,
        loading: false,
      });

      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  me: async () => {
    try {
      const res = await authApi.me();

      localStorage.setItem('email', res.userDto.email);
      localStorage.setItem('token', res.token);

      set({
        token: res.token,
        user_email: res.userDto.email,
        loading: false,
      });

      return res;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));

//! localStorage.getItem('token') //token'i saklamak için
//! localStorage.removeItem('token') //logout için
//! localStorage.setItem('token', res.data.token) //login sonrası token saklamak için
