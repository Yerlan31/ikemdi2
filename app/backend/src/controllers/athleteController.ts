import {Request, Response} from 'express';
import {
    getAllAthletes,
    getAthleteById,
    createAthlete,
    updateAthlete,
    deleteAthlete,
    getAthleteAndUserById
} from '../services/athletesService';
import {StatusCodes} from 'http-status-codes';
import formidable from 'formidable';
import path from 'path';
import * as bcryptjs from 'bcryptjs';

const errorMessage = {message: 'Internal Error'};

export const getAll = async (req: Request, res: Response) => {
    try {
        const athletes = await getAllAthletes();
        return res.status(StatusCodes.OK).json(athletes);
    } catch (err) {
        console.error('Error in getAll:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const athlete = await getAthleteById(parseInt(req.params.id));
        if (athlete) {
            return res.status(StatusCodes.OK).json(athlete);
        }
        return res.status(StatusCodes.NOT_FOUND).json({message: 'Athlete not found'});
    } catch (err) {
        console.error('Error in getById:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const data = await getAthleteAndUserById(parseInt(req.params.id));
        if (data) {
            return res.status(StatusCodes.OK).json(data);
        }
        return res.status(StatusCodes.NOT_FOUND).json({message: 'User not found'});
    } catch (err) {
        console.error('Error in getById:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};

export const create = async (req: Request, res: Response) => {
        try {
            const {name, age, weight_category, city, achievements, username, password, email, image} = req.body;

            if (!username || !email || !password || !name || !age || !weight_category || !city) {
                return res.status(StatusCodes.BAD_REQUEST).json("Invalid data!");
            }

            const salt = await bcryptjs.genSalt(10);
            const passwordHash = await bcryptjs.hash(password, salt);
            const athlete = await createAthlete({
                name: name,
                age: parseInt(age as unknown as string),
                weightCategory: weight_category,
                city: city,
                achievements: achievements,
                imageUrl: image, // Changed from "image_url" to "image"
                created_at: new Date(),
                updated_at: new Date(),
            }, {email: email, password: passwordHash, username: username, role: 'user'});

            return res.status(StatusCodes.CREATED).json(athlete);
        } catch (err) {
            console.error('Error in create:', err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
        }

}

export const update = async (req: Request, res: Response) => {
    try {
        const {name, age, weight_category, city, achievements, username, password, email, image} = req.body;
       console.log(name, age, weight_category, city, achievements, username, password, email, image);
        const id = req.params.id;
        if (!username || !email || !password || !name || !age || !weight_category || !city) {
            return res.status(StatusCodes.BAD_REQUEST).json("Invalid data!");
        }


        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);

        const athlete = await updateAthlete(id,{
            name: name,
            age: parseInt(age as unknown as string),
            weightCategory: weight_category,
            city: city,
            achievements: achievements,
            imageUrl: image, // Changed from "image_url" to "image"
            created_at: new Date(),
            updated_at: new Date(),
        }, {email: email, password: passwordHash, username: username, role: 'user'}, {newPassword: password});

        return res.status(StatusCodes.CREATED).json(athlete);
    } catch (err) {
        console.error('Error in create:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const athlete = await deleteAthlete(parseInt(req.params.id));
        if (athlete) {
            return res.status(StatusCodes.NO_CONTENT).send();
        }
        return res.status(StatusCodes.NOT_FOUND).json({message: 'Athlete not found'});
    } catch (err) {
        console.error('Error in remove:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};
