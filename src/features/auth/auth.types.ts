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

export interface AuthenticateUserDTO {
  email: string;
  password: string;
}
