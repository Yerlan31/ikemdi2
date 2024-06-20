import React, { useState, useEffect } from 'react';
import JudokaTable from '../../components/Game/GamesTable';
import Header from '../../components/Header';
import AddNewMatchBtn from '../../components/Match/AddNewMatchBtn';
import LeaderboardBtn from '../../components/LeaderboardBtn';
import LoginBtn from '../../components/LoginBtn';
import JudokaFilter from '../../components/Judoka/JudokaFilter';
import NewsBtn from '../../components/News/NewsBtn'; // Correct the import
import '../../styles/pages/games.css';
import AthleteBtn from "../../components/Athlete/AthleteBtn";
import NewsCreateBtn from "../../components/News/NewsCreateBtn";
import JudoMatchTree from "../../components/Judoka/JudoMatchTree";
import AthleteCreateBtn from "../../components/Athlete/AthleteCreateBtn";

const Games = () => {
    const [currentFilter, setCurrentFilter] = useState('Статус матча');
    const [isAdm, setIsAdm] = useState(false);
    const [logged, setLogin] = useState(false);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        if (user.token) setLogin(true);
        if (user.role === 'admin') setIsAdm(true);
    }, []);

    return (
        <>
            <Header
                page="СОРЕВНОВАНИЯ ПО ДЗЮДО"
                FirstNavigationLink={LeaderboardBtn}
                SecondNavigationLink={LoginBtn} // Fix the prop name
                ThirdNavigationLink={NewsBtn}
                FourthNavigationLink={AthleteCreateBtn}
                FiveNavigationLink={user?.role === 'admin' ? NewsCreateBtn : undefined}
                logged={logged}
                setLogin={setLogin}
            />
            <section className="games-section">
                <div className="games-handlers">
                    <JudokaFilter
                        currentFilter={currentFilter}
                        setCurrentFilter={setCurrentFilter}
                    />
                    {isAdm ? <AddNewMatchBtn /> : null}
                </div>
                <JudokaTable currentFilter={currentFilter} isAdm={isAdm} />
            </section>
        </>
    );
};

export default Games;
