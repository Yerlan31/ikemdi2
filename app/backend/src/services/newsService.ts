import News from '../database/models/news';

export const getAllNews = async () => {
    try {
        return await News.findAll();
    } catch (err) {
        console.error('Error in getAllNewsService:', err);
        throw new Error('Failed to fetch news');
    }
};

export const createNews = async (title: string, content: string, imageUrl: string | undefined) => {
    try {
        return await News.create({title, content, imageUrl});
    } catch (err) {
        console.error('Error in createNewsService:', err);
        throw new Error('Failed to create news');
    }
};

export const updateNews = async (id: number, updatedNews: any) => {
    try {
        const news = await News.findByPk(id);
        if (news) {
            await news.update(updatedNews);
        }
    } catch (err) {
        console.error('Error in update news:', err);
        throw new Error('Failed to update news');
    }
};
export const getNewsServiceById = async (id: number | string) => {
    return await News.findByPk(id);
};
