import Tournaments from "../database/models/tournaments";

export const getAllTournaments = async () => {
    try {
        return await Tournaments.findAll();
    } catch (err) {
        console.error('Error in get all tournaments:', err);
        throw new Error('Failed to fetch tournaments');
    }
};

export const createTournament = async (userId: number, title: string, description: string, contacts: string | undefined, yandexLocation: string | undefined, startAt: Date, endAt: Date) => {
    try {
        return await Tournaments.create({
            userId,
            title,
            description,
            contacts,
            yandexLocation,
            startAt,
            endAt,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    } catch (err) {
        console.error('Error in create tournaments:', err);
        throw new Error('Failed to create tournaments');
    }
};

export const updateTournament = async (id: number, title: string, description: string, contacts: string | undefined, yandexLocation: string | undefined, startAt: Date, endAt: Date) => {
    try {
        const tournaments = await Tournaments.findByPk(id);
        if (!tournaments) {
            throw new Error('Error tournaments not found!');

        }
        tournaments.title = title;
        tournaments.description = description;
        tournaments.yandexLocation = yandexLocation;
        tournaments.contacts = contacts;
        tournaments.startAt = startAt
        tournaments.endAt = endAt;
        await tournaments.save();

    } catch (err) {
        console.error('Error in update tournaments:', err);
        throw new Error('Failed to update tournaments');
    }
};
export const getTournamentServiceById = async (id: number | string) => {
    return await Tournaments.findByPk(id);
};

export const getTournamentsServiceByAccountId = async (id: number | string) => {
    return await Tournaments.findAll({where: {userId: id}});
};