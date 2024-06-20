export default interface ILeaderboard {
  name: string;             // Имя спортсмена
  totalPoints: number;      // Общее количество очков
  totalMatches: number;     // Общее количество матчей
  totalVictories: number;   // Общее количество побед
  totalDraws: number;       // Общее количество ничьих
  totalLosses: number;      // Общее количество поражений
  pointsScored: number;     // Набранные очки
  pointsAgainst: number;    // Пропущенные очки
  pointsDifference: number; // Разница очков
  efficiency: string | null; // Эффективность
}
