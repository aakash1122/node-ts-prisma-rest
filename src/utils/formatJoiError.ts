import Joi from 'joi';

export const formatJoiError = (err: Joi.ValidationError | undefined) => {
  return err?.details.map((er) => ({ message: er.message, filed: er.path }));
};
