import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TeamOption from '../Judoka/JudokaOption';
import Scoreboard from '../Scoreboard';

const EditGame = ({
                      homeTeam,
                      awayTeam,
                      homeTeamGoals,
                      awayTeamGoals,
                      idMatch,
                      updateMatch,
                      finishMatch,
                      getTeam,
                  }) => {
    const [currentHomeTeamGoals, setHomeTeamGoals] = useState(homeTeamGoals);
    const [currentAwayTeamGoals, setAwayTeamGoals] = useState(awayTeamGoals);

    const handleUpdateMatch = () => {
        updateMatch(idMatch, {
            homeTeamGoals: currentHomeTeamGoals,
            awayTeamGoals: currentAwayTeamGoals,
        });
    };

    const handleFinishMatch = () => {
        finishMatch(idMatch);
    };

    return (
        <section className="match-settings-section">
            <form className="match-settings-form">
                <div className="match-settings-form-options">
                    <TeamOption
                        testId="insertion_matches__select_home_team"
                        teams={homeTeam}
                        homeTeam
                        getTeam={getTeam}
                    />
                    <Scoreboard
                        testId="insertion_matches__select_quantity_goals_home_team"
                        homeTeam
                        score={currentHomeTeamGoals}
                        setScore={setHomeTeamGoals}
                        qtyGoal={homeTeamGoals}
                    />
                    <div className="match-settings-form-versus">
                        <span />
                        <span>X</span>
                    </div>
                    <Scoreboard
                        testId="insertion_matches__select_quantity_goals_away_team"
                        homeTeam={false}
                        score={currentAwayTeamGoals}
                        setScore={setAwayTeamGoals}
                        qtyGoal={awayTeamGoals}
                    />
                    <TeamOption
                        testId="insertion_matches__select_away_team"
                        teams={awayTeam}
                        homeTeam={false}
                        getTeam={getTeam}
                    />
                </div>
                <div className="match-settings-form-buttons">
                    <button
                        data-testid="insertion_matches__edit_match_btn"
                        onClick={handleUpdateMatch}
                        type="button"
                    >
                        Изменить
                    </button>
                    <button
                        data-testid="insertion_matches__finish_match_btn"
                        onClick={handleFinishMatch}
                        type="button"
                    >
                        Завершить
                    </button>
                </div>
            </form>
        </section>
    );
};

EditGame.propTypes = {
    homeTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
    awayTeam: PropTypes.arrayOf(PropTypes.object).isRequired,
    homeTeamGoals: PropTypes.number.isRequired,
    awayTeamGoals: PropTypes.number.isRequired,
    idMatch: PropTypes.number.isRequired,
    getTeam: PropTypes.func.isRequired,
    finishMatch: PropTypes.func.isRequired,
    updateMatch: PropTypes.func.isRequired,
};

export default EditGame;
