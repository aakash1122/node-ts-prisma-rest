import AuthController from '../controllers/AuthController';
import { Request, Response, Router } from 'express';
import JWT from 'jsonwebtoken';
import { checkToken } from '../helper/auth.helper';

let authRouter = Router();

const authController = new AuthController();

authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/check/token', checkToken, (req: Request, res: Response) => {});

export default authRouter;
