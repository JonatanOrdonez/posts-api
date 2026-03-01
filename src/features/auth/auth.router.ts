import { Router } from 'express';
import { AuthController } from './auth.controller';

export class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor(authController: AuthController) {
    this.authController = authController;
    this.router = Router();
    this.router.post('/login', this.authController.authenticateUser);
    this.router.post('/register', this.authController.createUser);
    this.router.get('/:id', this.authController.getUserById);
    this.router.patch('/:id', this.authController.updateUser);
  }
}
