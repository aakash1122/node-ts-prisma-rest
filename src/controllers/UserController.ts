import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import { formatJoiError } from "../utils/formatJoiError";
import bcrypt from "bcrypt";

const createUserSchema = Joi.object({
  email: Joi.string().email().required().lowercase(),
  fullName: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required(),
});

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { value, error, warning } = createUserSchema.validate(
      req.body,
      options
    );
    /*
     * validation error response
     */
    if (error) {
      return res.status(400).json({
        error: formatJoiError(error),
      });
    }
    /*
     * check if user email already exist
     */
    const userExist = await UserService.UserByEmail(value?.email);
    if (userExist)
      return res.status(420).json({
        message: "Email already exists",
      });

    /*
     * create user
     */

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value?.password, salt);
    const response = await UserService.create({
      ...value,
      password: hashedPassword,
    });

    return res.status(201).json({ data: response });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await UserService.users();
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong while fetching the data",
    });
  }
};

export default {
  createUser,
  getAllUser,
};
