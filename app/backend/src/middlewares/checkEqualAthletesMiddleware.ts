import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const verifyAthletesEqual = (req: Request, res: Response, next: NextFunction) => {
  const { athlete1, athlete2 } = req.body;

  if (athlete1 === athlete2) {
    return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'It is not possible to create a match with two identical athletes' });
  }

  next();
};

export default verifyAthletesEqual;
