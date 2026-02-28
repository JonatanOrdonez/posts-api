import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';

export const errorsMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const boomError = Boom.isBoom(error) ? error : Boom.boomify(error);
  const payload = {
    ...boomError.output.payload,
    message: boomError.message,
  };
  return res.status(boomError.output.statusCode).json(payload);
};
