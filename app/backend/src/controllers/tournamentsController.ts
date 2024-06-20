import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {
    getAllTournaments as getAllTournamentsService,
    createTournament as createTournamentsService,
    updateTournament as updateTournamentsService,
    getTournamentsServiceByAccountId as getTournamentsServiceByAccountIdService, getTournamentServiceById
} from '../services/tournamentsService';

const errorMessage = {message: 'Internal Error'};

export const getAllTournaments = async (req: Request, res: Response) => {
    try {
        const news = await getAllTournamentsService();
        return res.status(StatusCodes.OK).json(news);
    } catch (err) {
        console.error('Error in getAllTournaments:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};


export const createTournament = async (req: Request, res: Response) => {
    try {
        const {userId, title, description, yandexLocation, startAt, endAt, contacts} = req.body;
        if (userId && title && description) {
            const newTournaments = await createTournamentsService(
                userId,
                title,
                description,
                contacts,
                yandexLocation,
                startAt,
                endAt
            );

            return res.status(StatusCodes.CREATED).json(newTournaments);
        }

        return res.status(StatusCodes.BAD_REQUEST);
    } catch (err) {
        console.error('Error in create tournaments :', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error creating tournaments'});
    }
};


export const updateTournament = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log('Identifier', id);
        const {title, description, yandexLocation, startAt, endAt, contacts} = req.body;
        if (title && description) {
            const newTournaments = await updateTournamentsService(
                parseInt(id),
                title,
                description,
                contacts,
                yandexLocation,
                startAt,
                endAt
            );

            return res.status(StatusCodes.OK).json(newTournaments);
        }

        return res.status(StatusCodes.BAD_REQUEST);
    } catch (err) {
        console.error('Error in updating tournaments:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error creating tournaments'});
    }
};


export const getTournamentById = async (req: Request, res: Response) => {
    try {
        const tournaments = await getTournamentServiceById(parseInt(req.params.id));
        if (tournaments) {
            return res.status(StatusCodes.OK).json(tournaments);
        }
        return res.status(StatusCodes.NOT_FOUND).json({message: 'Tournaments not found'});
    } catch (err) {
        console.error('Error in getById:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};


export const getTournamentByAccountId = async (req: Request, res: Response) => {
    try {
        const tournaments = await getTournamentsServiceByAccountIdService(parseInt(req.params.id));
        return res.status(StatusCodes.OK).json(tournaments);
    } catch (err) {
        console.error('Error in getById:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};
