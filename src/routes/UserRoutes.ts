import { createUserSchema } from './../utils/validateSchema';
import UserController from '../controllers/UserController';
import { Request, Response, Router } from 'express';
import { validator } from '../utils/validator';

let userRouter = Router();

userRouter.get('/all', UserController.getAllUser);
userRouter.post(
  '/create',
  validator(createUserSchema),
  UserController.createUser
);

export default userRouter;
