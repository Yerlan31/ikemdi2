import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as dotenv from 'dotenv';
import { validateToken } from '../utils/authToken';

dotenv.config();

const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });

    const tokenOk = validateToken(token);

    if (!tokenOk) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User unauthorized' });
    }

    req.body.infoUser = tokenOk;

    next();
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('ERROR INTERNO');
  }
};

export default authorization;
