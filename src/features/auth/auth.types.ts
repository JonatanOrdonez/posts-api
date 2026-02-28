export interface User {
  id: string;
  email: string;
  password: string;
  roles: string[];
}

export interface CreateUserDTO {
  email: string;
  password: string;
  roles: string[];
}

export interface AuthenticateUserDTO {
  email: string;
  password: string;
}
