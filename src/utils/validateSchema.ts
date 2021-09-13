import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required().lowercase(),
  fullName: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required(),
});
