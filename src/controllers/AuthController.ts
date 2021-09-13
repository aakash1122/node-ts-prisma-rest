import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import { LoginResponse } from 'interfaces/auth.interface';
import { extractAuthHeader } from '../helper/auth.helper';

interface AuthMethods {
  login: (req: Request, res: Response) => any;
  logout: (req: Request, res: Response) => void;
}

class AuthController implements AuthMethods {
  private ATSecret = process.env.ACCESS_TOKEN_SECRET || '';

  async login(req: Request, res: Response) {
    const ATSecret = process.env.ACCESS_TOKEN_SECRET || '';
    let data: LoginResponse = {
      username: 'aakash',
      email: 'aakash@Wgmaidlkf.com',
      accessToken: JWT.sign(
        {
          name: 'aakash',
          email: 'aakash@Wgmaidlkf.com',
        },
        ATSecret,
        {
          expiresIn: '30m',
        }
      ),
      refreshToken: 'dfasdfasfdsf',
    };
    return res.status(200).json(data);
  }

  logout(req: Request, res: Response) {
    const token = extractAuthHeader(req);
    if (!token) return res.status(403).json('Bhag shala');

    try {
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET || '');
      res.status(200).jsonp('jaa korsi tore logout');
    } catch (error) {}
  }
}

export default AuthController;
