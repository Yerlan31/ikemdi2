import { Router } from 'express';
import validateEmail from '../middlewares/validateEmailMiddleware';
import { getRoleUser, login } from '../controllers/loginController';
import validadePassword from '../middlewares/validatePasswordMiddleware';
import validateToken from '../middlewares/validateTokenMiddleware';
import { getAllTeams, getByIdTeam } from '../controllers/judoController';
import {
  matchFinish,
  createMatchInProgress,
  getAllMatches,
  matchUpdate, getMatchById, getMatchesByTournamentId
} from '../controllers/matchesController';
import verifiTeamsEqual from '../middlewares/checkEqualAthletesMiddleware';
import verifiTeamsExistDataBase from '../middlewares/checkExistsTeamDatabase';
import getLeaderboard from '../controllers/leaderboardController';
import {createNews, getAllNews, getNewsById, updateNews} from "../controllers/newsController";
import {create, getAll, getById, getMe, remove, update} from "../controllers/athleteController";
import {
  createTournament,
  getAllTournaments, getTournamentByAccountId,
  getTournamentById,
  updateTournament
} from "../controllers/tournamentsController";

const router = Router();

router.get(
  '/login/validate',
  validateToken,
  getRoleUser,
);

router.post(
  '/login',
  validateEmail,
  validadePassword,
  login,
);

router.get(
  '/teams',
  getAllTeams,
);

router.get(
  '/teams/:id',
  getByIdTeam,
);

router.post(
  '/match',
  createMatchInProgress,
);

router.get(
  '/matches',
  getAllMatches,
);

router.get(
    '/match/:id',
    getMatchById,
);


router.get(
    '/matches/tournament/:id',
    getMatchesByTournamentId,
);

router.patch(
  '/matches/:id/finish',
  matchFinish,
);

router.patch(
  '/match/:id',
  matchUpdate,
);

router.get(
  '/leaderboard',
  getLeaderboard,
);

router.get('/me/:id', getMe);

router.get('/news', getAllNews);
router.post('/news', createNews);
router.get('/news/:id', getNewsById);
router.patch('/news/:id', updateNews);

router.get('/tournaments', getAllTournaments);
router.post('/tournament', createTournament);
router.get('/tournament/:id', getTournamentById);
router.get('/tournaments/:id', getTournamentByAccountId);
router.patch('/tournament/:id', updateTournament);

router.get('/athletes', getAll);
router.get('/athletes/:id', getById);
router.post('/athletes', create);
router.patch('/athletes/:id', update);
router.delete('/athletes/:id', remove);

export default router;
