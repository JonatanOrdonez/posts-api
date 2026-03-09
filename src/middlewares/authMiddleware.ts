import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';
import { supabase } from '../config/supabase';
import { AuthUser } from '@supabase/supabase-js';

interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

export const getUserFromRequest = (req: AuthenticatedRequest): AuthUser => {
  if (req.user) {
    return req.user;
  }

  throw Boom.unauthorized('User not authenticated');
};

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    throw Boom.unauthorized('Authorization header is missing');
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    throw Boom.unauthorized('Token is missing');
  }

  const userResponse = await supabase.auth.getUser(token);

  if (userResponse.error) {
    throw Boom.unauthorized(userResponse.error.message);
  }

  req.user = userResponse.data.user;
  next();
};
