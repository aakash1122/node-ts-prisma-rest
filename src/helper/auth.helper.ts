import JWT from 'jsonwebtoken';
import { Response } from 'express';
import { Request } from 'express';

const checkToken = async (req: Request, res: Response) => {
  const accessToken = req.headers['authorization']?.split(' ')[1];

  if (!accessToken) return res.status(401).json('no access token');

  const ATSecret = process.env.ACCESS_TOKEN_SECRET || '';

  try {
    const decodedData = JWT.verify(accessToken, ATSecret);
    return res.status(200).json(decodedData);
  } catch (error) {
    return res.status(401).json('invalid token');
  }

  res.json('token okay');
};

const extractAuthHeader = (req: Request) => {
  return req.headers['authorization']?.split(' ')[1];
};

export { checkToken, extractAuthHeader };
