import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { formatJoiError } from '../utils/formatJoiError';
import bcrypt from 'bcrypt';
import { BaseError } from '../Error/index';
import { validator } from '../utils/validator';
import { createUserSchema } from '../utils/validateSchema';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const value = req.body;
    /*
     * check if user email already exist
     */
    const userExist = await UserService.UserByEmail(value?.email);
    if (userExist) throw new BaseError('user already exist with this email');
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
      status: 'success',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'something went wrong while fetching the data',
    });
  }
};

export default {
  createUser,
  getAllUser,
};
