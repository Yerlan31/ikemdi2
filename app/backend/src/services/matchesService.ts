import Matches from '../database/models/matches';
import Athletes from '../database/models/athletes';
import {Identifier} from "sequelize";

export const getAllMatchesService = async (filter: unknown) => {
  const allMatches = await Matches.findAll({
    include: [
      { model: Athletes, as: 'athlete1', attributes: ['name'] },
      { model: Athletes, as: 'athlete2', attributes: ['name'] },
      { model: Athletes, as: 'athlete', attributes: ['name'] },
    ],
  });

  if (filter === undefined) return allMatches;

  if (filter === 'true') return allMatches.filter((match) => match.inProgress === true);

  if (filter === 'false') return allMatches.filter((match) => match.isFinished === true);
};

export const createMatchInProgressService = async (body: unknown) => {
  return await Matches.create(body);
};

export const matchFinishService = async (id: string) => {
  return await Matches.update({inProgress: false, isFinished: true}, {where: {id}});
};

export const updateMatchService = async (id: string, body: object) => {
  return await Matches.update(body, {where: {id}});
};


export const getMatchesServiceByTournamentId = async (tournamentId: string) => {
  return Matches.findAll({where : {tournamentId}})
}

export const getMatchServiceById = async (id: Identifier | undefined) => {
  return Matches.findByPk(id);
}