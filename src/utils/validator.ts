import { Request, Response, NextFunction } from 'express';
import { SuperBad } from '../Error/index';
import Joi, { any, string } from 'joi';
import { formatJoiError } from './formatJoiError';

interface IValidationRes {
  value: any;
  error: string | undefined;
}

export const validator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data: Joi.ValidationResult = schema.validate(req.body);

    if (data.error) {
      throw new SuperBad(formatJoiError(data.error));
    }
    next();
  };
};
