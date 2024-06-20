import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const message = 'Incorrect email or password';

const validadePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'All fields must be filled' });
  }

  if ((typeof password) !== 'string') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message });
  }

  const min = 6;
  if (password.length < min) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message });
  }

  next();
};

export default validadePassword;
