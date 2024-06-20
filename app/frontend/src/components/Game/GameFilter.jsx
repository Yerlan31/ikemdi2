import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GamerFilter = ({ currentFilter, setCurrentFilter }) => {
    const [selectedFilter, setSelectedFilter] = useState(currentFilter);

    const handleCurrentFilter = () => {
        setCurrentFilter(selectedFilter);
    };

    const handleChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    return (
        <form>
            <label htmlFor="game-filter">
                Игры:
                <select
                    id="game-filter"
                    value={selectedFilter}
                    onChange={handleChange}
                    data-testid="matches__option_show_finish_matches"
                >
                    <option>Все игры</option>
                    <option>В процессе</option>
                    <option>Завершенные</option>
                </select>
            </label>
            <button
                data-testid="matches__search_match_btn"
                type="button"
                onClick={handleCurrentFilter}
            >
                Поиск
            </button>
        </form>
    );
};

GamerFilter.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    setCurrentFilter: PropTypes.func.isRequired,
};

export default GamerFilter;
