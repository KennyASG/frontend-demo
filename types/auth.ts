// types/auth.ts

/**
 * Modelo de Role según el backend
 */
export interface Role {
  id: number;
  description: string;
}

/**
 * Modelo de User según la respuesta del backend
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

/**
 * Request para login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Response del backend al hacer login
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Request para registro
 * El registro pide más campos que los que se devuelven en login
 */
export interface RegisterRequest {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  birthdate: string;
  password: string;
}

/**
 * Response del backend al registrarse
 */
export interface RegisterResponse {
  message: string;
  user?: User;
}

/**
 * Estado global de autenticación
 */
export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  hydrate: () => void;
}

/**
 * Verifica si el usuario es administrador
 */
export function isAdmin(user: User | null): boolean {
  return user?.role?.id === 1;
}

/**
 * Obtener nombre del rol
 */
export function getRoleName(role: Role): string {
  return role.description === 'admin' ? 'Administrador' : 'Usuario';
}