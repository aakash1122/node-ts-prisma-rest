import Joi from 'joi';

export const formatJoiError = (err: Joi.ValidationError) => {
  return err?.details.map((er) => er.message).join(',');
};
