import {Model} from "sequelize";

export interface IMatch {
  id: number;            // Идентификатор матча
  tournamentId: number;
  athlete1: number;      // Идентификатор первого спортсмена
  athlete1Score: number; // Очки первого спортсмена
  athlete2: number;      // Идентификатор второго спортсмена
  athlete: number;      // Идентификатор второго спортсмена
  round: number;
  athlete2Score: number; // Очки второго спортсмена
  youtubeLink: string;
  inProgress: boolean;   // Статус матча (в процессе или завершен)
  isFinished: boolean;
}

