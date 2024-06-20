import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/pages/games.css';
import GamerFilter from "../Game/GameFilter";

const JudokaFilter = ({ currentFilter, setCurrentFilter }) => {
    const handleCurrentFilter = () => {
        const selectedFilter = document.getElementById('classification-filter').value;
        setCurrentFilter(selectedFilter);
    };

    return (
        <form>
            <label htmlFor="classification-filter">
                Соревнования:
                <select
                    id="classification-filter"
                    defaultValue={ currentFilter }
                    data-testid="judoka__classification_filter"
                >
                    <option>Общая классификация</option>
                    <option>Домашняя классификация</option>
                    <option>Гостевая классификация</option>
                </select>
            </label>
            <button
                data-testid="judoka__classification_filter_button"
                type="button"
                onClick={ () => handleCurrentFilter() }
            >
                Применить
            </button>
        </form>
    );
};

GamerFilter.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    setCurrentFilter: PropTypes.func.isRequired,
};

export default JudokaFilter;
