import AuthController from '../controllers/AuthController';
import { Request, Response, Router } from 'express';
import JWT from 'jsonwebtoken';

let authRouter = Router();

const authController = new AuthController();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;
