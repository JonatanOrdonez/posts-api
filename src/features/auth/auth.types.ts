export interface User {
  id: string;
  email: string;
  name: string | null;
  address: string | null;
  password: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface CreateUserDTO {
  email: string;
  password: string;
  role: UserRole;
  name?: string | null;
  address?: string | null;
}

export interface UpdateUserDTO {
  id: string;
  name?: string | null;
  address?: string | null;
}

export interface AuthenticateUserDTO {
  email: string;
  password: string;
}
