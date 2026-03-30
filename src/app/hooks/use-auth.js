// ! apps/web/src/app/hooks/use-auth.js
import { useAuthStore } from '../store/auth.store';

export function useAuth() {
  const store = useAuthStore();

  return {
    user: store.user,
    user_email: store.user_email,
    token: store.token,

    loading: store.loading,
    error: store.error,

    login: store.login,
    register: store.register,
    verifyOtp: store.verifyOtp,
    logout: store.logout,
  };
}
