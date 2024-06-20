import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createMatchInProgressService,
  getAllMatchesService, getMatchesServiceByTournamentId, getMatchServiceById,
  matchFinishService,
  updateMatchService,
} from "../services/matchesService";


const errorMessage = { message: 'Внутренняя ошибка' };

export const getAllMatches = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;

    const allMatches = await getAllMatchesService(inProgress);

    return res.status(StatusCodes.OK).json(allMatches);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
  }
};

export const createMatchInProgress = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const matchCreate = await createMatchInProgressService({...body, createdAt: new Date(), updatedAt: new Date()});

    return res.status(StatusCodes.CREATED).json(matchCreate);
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
  }
};

export const matchFinish = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await matchFinishService(id);
    return res.status(StatusCodes.OK).json({ message: 'Завершено' });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
  }
};

export const matchUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await updateMatchService(id, req.body);

    return res.status(StatusCodes.OK).json({ message: 'Обновлен матч' });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
  }
};

export const getMatchById = async (req: Request, res: Response) => {
  try {
    const  id  = req.params.id;
    const match = await getMatchServiceById(id);
    if (!match)
      throw new Error("not found!");
    return res.status(StatusCodes.OK).json(match);
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
  }
}

export const getMatchesByTournamentId = async (req: Request, res: Response) => {
  try {
    const  id  = req.params.id;
    const matches = await getMatchesServiceByTournamentId(id);
    return res.status(StatusCodes.OK).json(matches);
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
  }
}