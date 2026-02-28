export interface User {
  id: string;
  email: string;
  password: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
}

export interface AuthenticateUserDTO {
  email: string;
  password: string;
}
