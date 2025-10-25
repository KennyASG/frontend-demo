// stores/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token: string, user: User) => {
        // Guardar en localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth-token', token);
          localStorage.setItem('auth-user', JSON.stringify(user));
          
          // Guardar token en cookie para el middleware
          document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 días
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
          
          // Limpiar cookie
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
              
              // También restaurar cookie si no existe
              if (!document.cookie.includes('auth-token=')) {
                document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
              }
              
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
    }),
    {
      name: 'auth-storage',
    }
  )
);