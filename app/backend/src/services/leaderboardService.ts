import { getAllMatchesService } from './matchesService';
import Matches from '../database/models/matches';
import ILeaderboard from '../interfaces/ILeaderboard';
import {getAllAthletes} from "./athletesService";

const totalPoints = (matches: Matches[] | undefined) => {
  let value = 0;
  matches?.forEach((match: Matches) => {
    if (match.athlete1Score > match.athlete2Score) value += 3;
    if (match.athlete1Score === match.athlete2Score) value += 1;
    if (match.athlete1Score < match.athlete2Score) value += 0;
  });

  return value;
};

const totalVictories = (matches: Matches[] | undefined) => {
  const victories = matches?.filter((match) => match.athlete1Score > match.athlete2Score);

  return victories?.length;
};

const totalDraws = (matches: Matches[] | undefined) => {
  const draws = matches?.filter((match) => match.athlete1Score === match.athlete2Score);

  return draws?.length;
};

const totalLosses = (matches: Matches[] | undefined) => {
  const losses = matches?.filter((match) => match.athlete1Score < match.athlete2Score);

  return losses?.length;
};

const scoresFavor = (matches: Matches[] | undefined) => {
  const value: number[] = [];

  matches?.forEach((match) => value.push(match.athlete1Score));

  const totalScore = value?.reduce((acc, curr) => acc + curr, 0);

  return totalScore;
};

const scoresOwn = (matches: Matches[] | undefined) => {
  const value: number[] = [];

  matches?.forEach((match) => value.push(match.athlete2Score));

  const totalScore = value?.reduce((acc, curr) => acc + curr, 0);

  return totalScore;
};

const efficiency = (matches: Matches[] | undefined) => {
  if (!matches) return null;

  const baseEffic = ((totalPoints(matches) / (matches.length * 3)) * 100);

  const total = Math.round(baseEffic * 100) / 100;

  return String(total);
};

const sortLeaderboard = (leaderboard: ILeaderboard[] | undefined) => leaderboard
    ?.sort((a, b) => (b.totalPoints - a.totalPoints)
        || (b.pointsDifference - a.pointsDifference)
        || (b.pointsScored - a.pointsScored)
        || (b.pointsAgainst - a.pointsAgainst));


const getLeaderboardService = async () => {
  const finalizedMatches = await getAllMatchesService('false');
  const allAthletes = await getAllAthletes();

  const leaderboard: ILeaderboard[] = allAthletes.map((athlete) => {
    const matches = finalizedMatches?.filter((match) => match.athlete1Id === athlete.id);

    return {
      name: athlete.name,
      totalPoints: totalPoints(matches),
      totalMatches: matches?.length || 0,
      totalVictories: totalVictories(matches) || 0,
      totalDraws: totalDraws(matches) || 0,
      totalLosses: totalLosses(matches) || 0,
      pointsScored: scoresFavor(matches) || 0,
      pointsAgainst: scoresOwn(matches) || 0,
      pointsDifference: (scoresFavor(matches) || 0) - (scoresOwn(matches) || 0),
      efficiency: efficiency(matches),
    };
  });

  return sortLeaderboard(leaderboard);
};

export default getLeaderboardService;
