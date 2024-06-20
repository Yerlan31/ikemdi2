import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import JudokaLeaderboardTable from '../components/LeaderboardTable';
import TableFilter from '../components/Judoka/JudokaFilter';
import LoginBtn from '../components/LoginBtn';
import '../styles/pages/leaderboard.css';
import NewsBtn from "../components/News/NewsBtn";
import AthleteBtn from "../components/Athlete/AthleteBtn";
import NewsCreateBtn from "../components/News/NewsCreateBtn";

const Leaderboard = () => {
    const [logged, setLogin] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('Общая классификация');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (!user) return setLogin(false);

        if (JSON.parse(user).token) return setLogin(true);
    }, [logged, setLogin]);

    return (
        <>
            <Header
                page="ТУРНИРНАЯ ТАБЛИЦА"
            />
            <div className="classification-handlers score-board-table-section">
                <TableFilter
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                />
            </div>
            <JudokaLeaderboardTable
                currentFilter={currentFilter}
            />
        </>
    );
};

export default Leaderboard;
