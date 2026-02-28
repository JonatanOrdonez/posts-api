import { AuthenticateUserDTO, CreateUserDTO, User } from './auth.types';
import Boom from '@hapi/boom';

export class AuthService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  getUserById = (userId: string): User => {
    const userFound = this.users.find((user) => user.id === userId);

    if (!userFound) {
      throw Boom.notFound('User not found');
    }

    return userFound;
  };

  authenticateUser = (credentials: AuthenticateUserDTO): User => {
    const userFound = this.users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

    if (!userFound) {
      throw Boom.unauthorized('Invalid credentials');
    }

    return userFound;
  };

  createUser = (data: CreateUserDTO): User => {
    const emailTaken = this.users.find((user) => user.email === data.email);

    if (emailTaken) {
      throw Boom.conflict('Email already in use');
    }

    const newUser: User = {
      id: new Date().getTime().toString(),
      email: data.email,
      password: data.password,
    };

    this.users.push(newUser);
    return newUser;
  };
}
