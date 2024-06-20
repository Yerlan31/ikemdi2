import React from 'react';
import PropTypes from 'prop-types';

const JudokaOption = ({ teams, homeTeam, getTeam, testId }) => (
    <label htmlFor={ (homeTeam) ? 'home-team-select' : 'away-team-select' }>
        { (homeTeam) ? <p>Домашняя команда</p> : <p>Гостевая команда</p> }
        <select
            data-testid={ testId }
            onChange={ ({ target: { value } }) => {
                const homeOrAway = (homeTeam) ? 'homeTeam' : 'awayTeam';
                getTeam(value, homeOrAway);
            } }
        >
            {
                teams.map(({ teamName }, index) => (
                    <option key={ index } value={ teamName }>{ teamName }</option>
                ))
            }
        </select>
    </label>
);

JudokaOption.propTypes = {
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
    homeTeam: PropTypes.bool.isRequired,
    getTeam: PropTypes.func.isRequired,
    testId: PropTypes.string.isRequired,
};

export default JudokaOption;
