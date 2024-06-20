import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    getAllNews as getAllNewsService,
    createNews as createNewsService,
    updateNews as updateNewsService,
    getNewsServiceById
} from '../services/newsService';

const errorMessage = { message: 'Internal Error' };

export const getAllNews = async (req: Request, res: Response) => {
    try {
        const news = await getAllNewsService();
        return res.status(StatusCodes.OK).json(news);
    } catch (err) {
        console.error('Error in getAllNews:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};


export const createNews = async (req: Request, res: Response) => {
        try {
            const { title, content, image } = req.body;
            if (title && content) {
                const newNews = await createNewsService(
                    title,
                    content,
                    image,
                );

                return res.status(StatusCodes.CREATED).json(newNews);
            }

            return res.status(StatusCodes.BAD_REQUEST);
        } catch (err) {
            console.error('Error in createNews:', err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating news' });
        }
};


export const updateNews = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { title, content, image } = req.body;
        if (title && content) {
            const newNews = await updateNewsService(
                parseInt(id),
                {
                    title,
                    content,
                    imageUrl:image,
                }
            );

            return res.status(StatusCodes.OK).json(newNews);
        }

        return res.status(StatusCodes.BAD_REQUEST);
    } catch (err) {
        console.error('Error in updating news:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating news' });
    }
};



export const getNewsById = async (req: Request, res: Response) => {
    try {
        const news = await getNewsServiceById(parseInt(req.params.id));
        if (news) {
            return res.status(StatusCodes.OK).json(news);
        }
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'News not found' });
    } catch (err) {
        console.error('Error in getById:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};
