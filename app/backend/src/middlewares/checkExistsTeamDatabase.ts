import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import {getAllAthletes} from "../services/athletesService";

const verifyAthletesExistDatabase = async (req: Request, res: Response, next: NextFunction) => {
  const { athlete1, athlete2 } = req.body;

  const athletesExist = await getAllAthletes();

  const athlete1Exist = athletesExist.some((athlete) => athlete.id === athlete1);
  const athlete2Exist = athletesExist.some((athlete) => athlete.id === athlete2);

  if (!athlete1Exist || !athlete2Exist) {
    return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no athlete with such id!' });
  }
  next();
};

export default verifyAthletesExistDatabase;
