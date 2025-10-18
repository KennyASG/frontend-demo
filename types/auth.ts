// types/auth.ts
export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    birthdate: string;
    role: 'user' | 'admin';
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface RegisterRequest {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    birthdate: string;
    password: string;
  }
  
  export interface RegisterResponse {
    message: string;
    user?: User;
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    hydrate: () => void;
  }