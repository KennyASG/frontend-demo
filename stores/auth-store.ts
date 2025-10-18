// stores/auth-store.ts
import { create } from 'zustand';
import { AuthState, User } from '@/types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (token: string, user: User) => {
    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth-token', token);
      localStorage.setItem('auth-user', JSON.stringify(user));
    }

    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    // Limpiar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user');
    }

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  hydrate: () => {
    // Restaurar el estado desde localStorage al cargar la app
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      const userStr = localStorage.getItem('auth-user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({
            token,
            user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('auth-token');
          localStorage.removeItem('auth-user');
        }
      }
    }
  },
}));