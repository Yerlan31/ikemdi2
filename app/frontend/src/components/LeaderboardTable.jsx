import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { requestData } from '../services/requests';
import Loading from './Loading';
import '../styles/components/leaderboardTable.css';

const LeaderboardTable = ({ currentFilter }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  const getLeaderboard = async (endpoint) => {
    try {
      const response = await requestData(endpoint);
      setLeaderboard(response);
    } catch (error) {
      console.error('Ошибка при получении таблицы лидеров:', error);
      // Дополнительная обработка ошибки, если необходимо
    }
  };

  useEffect(() => {
    const endpointMap = {
      'Домашняя команда': '/leaderboard/home',
      'Гостевая команда': '/leaderboard/away',
      default: '/leaderboard',
    };
    const endpoint = endpointMap[currentFilter] || endpointMap.default;
    getLeaderboard(endpoint);
  }, [currentFilter]);

  if (!leaderboard.length) {
    return <Loading />;
  }

  return (
      <section className="score-board-table-section">
        <table className="score-board-table">
          <thead>
          <tr>
            <th>Место</th>
            <th>ФИО</th>
            <th>Очки</th>
            <th>Сыграно</th>
            <th>Победы</th>
            <th>Ничьи</th>
            <th>Поражения</th>
            <th>Забито</th>
            <th>Пропущено</th>
            <th>Разница</th>
            <th>Эффективность</th>
          </tr>
          </thead>
          <tbody>
          {leaderboard.map((team, index) => (
              <tr key={team.name}>
                <td>{index + 1}</td>
                <td>{team.name}</td>
                <td>{team.totalPoints}</td>
                <td>{team.totalGames}</td>
                <td>{team.totalVictories}</td>
                <td>{team.totalDraws}</td>
                <td>{team.totalLosses}</td>
                <td>{team.goalsFavor}</td>
                <td>{team.goalsOwn}</td>
                <td>{team.goalsBalance}</td>
                <td>{team.efficiency}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </section>
  );
};

LeaderboardTable.propTypes = {
  currentFilter: PropTypes.string.isRequired,
};

export default LeaderboardTable;
