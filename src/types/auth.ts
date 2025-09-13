export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  birthdate: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}