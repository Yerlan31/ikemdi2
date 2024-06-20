import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {getAllAthletes, getAthleteById} from "../services/athletesService";

export const getAllTeams = async (_req: Request, res: Response) => {
  try {
    const allTeams = await getAllAthletes();
    return res.status(StatusCodes.OK).json(allTeams);
  } catch (err: unknown) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro Interno' });
  }
};

export const getByIdTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const team = await getAthleteById(id);

    if (!team) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Time not found' });

    return res.status(StatusCodes.OK).json(team);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro Interno' });
  }
};
