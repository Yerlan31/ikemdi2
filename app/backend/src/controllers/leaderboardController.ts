import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import getJudokaLeaderboardService from '../services/leaderboardService';

// Обработчик маршрута для получения таблицы лидеров
const getJudokaLeaderboard = async (_req: Request, res: Response) => {
  try {
    // Вызов сервиса для получения данных таблицы лидеров
    const leaderboard = await getJudokaLeaderboardService();
    // Возврат успешного ответа с кодом 200 и данными таблицы лидеров в формате JSON
    return res.status(StatusCodes.OK).json(leaderboard);
  } catch (err) {
    // Логирование ошибки
    console.log(err);
    // Возврат ответа с кодом 500 и сообщением об ошибке
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Внутренняя ошибка' });
  }
};

export default getJudokaLeaderboard;
