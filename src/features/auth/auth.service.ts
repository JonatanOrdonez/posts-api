import {
  AuthenticateUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
  User,
} from './auth.types';
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
      id: crypto.randomUUID(),
      email: data.email,
      password: data.password,
      role: data.role,
      name: data.name ?? null,
      address: data.address ?? null,
    };

    this.users.push(newUser);
    return newUser;
  };

  updateUser = (user: UpdateUserDTO): User => {
    const { id, name, address } = user;
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw Boom.notFound('User not found');
    }

    const userAtIndex = this.users[userIndex];

    const updatedUser = {
      ...userAtIndex,
      name: name === undefined ? userAtIndex.name : name,
      address: address === undefined ? userAtIndex.address : address,
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  };
}
