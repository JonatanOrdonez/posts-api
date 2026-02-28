import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { AuthService } from './auth.service';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = this.authService.getUserById(String(id));
    return res.json(user);
  };

  authenticateUser = (req: Request, res: Response) => {
    if (!req.body) {
      throw Boom.badRequest('Request body is required');
    }

    const { email, password } = req.body;

    if (email === undefined) {
      throw Boom.badRequest('Email is required');
    }

    if (password === undefined) {
      throw Boom.badRequest('Password is required');
    }

    const user = this.authService.authenticateUser({ email, password });
    return res.json(user);
  };

  createUser = (req: Request, res: Response) => {
    if (!req.body) {
      throw Boom.badRequest('Request body is required');
    }

    const { email, password } = req.body;

    if (email === undefined) {
      throw Boom.badRequest('Email is required');
    }

    if (password === undefined) {
      throw Boom.badRequest('Password is required');
    }

    const user = this.authService.createUser({ email, password });
    return res.status(201).json(user);
  };
}
