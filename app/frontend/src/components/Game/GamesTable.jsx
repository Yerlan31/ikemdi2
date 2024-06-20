import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { requestData } from '../../services/requests';
import Loading from '../Loading';
import { check, editIcon } from '../../images';

const GamesTable = ({ currentFilter, isAdm }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getGames = async (endpoint) => {
    try {
      const response = await requestData(endpoint);
      setGames(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const endpoint = '/matches';
    let filterEndpoint = endpoint;

    switch (currentFilter) {
      case 'В процессе':
        filterEndpoint += '?inProgress=true';
        break;
      case 'Завершенные':
        filterEndpoint += '?inProgress=false';
        break;
      default:
        break;
    }

    getGames(filterEndpoint);
  }, [currentFilter]);

  if (loading) {
    return <Loading />;
  }

  return (
      <table className="games-table">
        <thead>
        <tr>
          <th className="games-table-thead-home-team">Хозяева</th>
          <th className="games-table-thead-goals">Голы</th>
          <th className="games-table-thead-versus"> </th>
          <th className="games-table-thead-goals">Голы</th>
          <th className="games-table-thead-away-team">Гости</th>
          <th className="games-table-thead-empty-space"> </th>
          <th className="games-table-thead-status">Статус</th>
        </tr>
        </thead>
        <tbody>
        {games
            .sort((a, b) => b.inProgress - a.inProgress)
            .map(({ id, teamHome, homeTeamGoals, teamAway, awayTeamGoals, inProgress }) => (
                <tr key={id}>
                  <td
                      className="games-table-tbody-home-team"
                      data-testid={`matches__home_team_${id}`}
                  >
                    {teamHome?.teamName}
                  </td>
                  <td
                      className="games-table-tbody-home-team-goals"
                      data-testid={`matches__home_team_goals_${id}`}
                  >
                    {homeTeamGoals}
                  </td>
                  <td className="games-table-tbody-versus">X</td>
                  <td
                      className="games-table-tbody-away-team-goals"
                      data-testid={`matches__away_team_goals_${id}`}
                  >
                    {awayTeamGoals}
                  </td>
                  <td
                      className="games-table-tbody-away-team"
                      data-testid={`matches__away_team_${id}`}
                  >
                    {teamAway?.teamName}
                  </td>
                  <td className="games-table-tbody-empty-space"> </td>
                  <td className="games-table-tbody-status">
                    <div>
                      {inProgress ? (
                          <p
                              className="game-status in-progress"
                              data-testid={`matches__match_status_${id}`}
                          >
                            В процессе
                          </p>
                      ) : (
                          <p
                              className="game-status finished-game"
                              data-testid={`matches__match_status_${id}`}
                          >
                            Завершен
                          </p>
                      )}
                    </div>
                    {isAdm && (
                        <button
                            type="button"
                            data-testid={`matches__match_status_btn_${id}`}
                            disabled={!inProgress}
                            onClick={() => {
                              navigate('/matches/settings', {
                                state: {
                                  id,
                                  teamHome,
                                  homeTeamGoals,
                                  teamAway,
                                  awayTeamGoals,
                                  inProgress,
                                },
                              });
                              localStorage.setItem('game', 'редактировать');
                            }}
                        >
                          {inProgress ? (
                              <img src={editIcon} alt="Игра в процессе" />
                          ) : (
                              <img src={check} alt="Игра завершена" />
                          )}
                        </button>
                    )}
                  </td>
                </tr>
            ))}
        </tbody>
      </table>
  );
};

GamesTable.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  isAdm: PropTypes.bool.isRequired,
};

export default GamesTable;
