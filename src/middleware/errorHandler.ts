import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../Error/index';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let code = 500;
  if (err instanceof BaseError) {
    code = err.getCode();
  }

  return res.status(code).json({
    correlationId: req.headers['x-correlation-id'],
    message: err?.message,
  });
};
