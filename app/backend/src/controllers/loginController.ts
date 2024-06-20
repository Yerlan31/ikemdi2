import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginService from '../services/loginService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existUser = await loginService.verifyUser(email, password);

    return res.status(StatusCodes.OK).json(existUser);
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof Error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
    }
  }
};

export const getRoleUser = (req: Request, res: Response) => {
  try {
    const { role } = req.body.infoUser;
    return res.status(200).json(role);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro Interno' });
  }
};
