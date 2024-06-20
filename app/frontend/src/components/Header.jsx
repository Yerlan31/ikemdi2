import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {negativeLogo, exitToAppImg} from '../images';
import '../styles/components/header.css';
import AthleteBtn from './Athlete/AthleteBtn';
import LeaderboardBtn from './LeaderboardBtn';
import LoginBtn from './LoginBtn';
import NewsBtn from './News/NewsBtn';
import NewsCreateBtn from './News/NewsCreateBtn';
import MyProfileBtn from './MyProfile/MyProfileBtn';
import AthleteCreateBtn from "./Athlete/AthleteCreateBtn";
import TournamentsBtn from "./Tournament/TournamentsBtn";
import AllTournamentsBtn from "./Tournament/AllTournamentsBtn";
import MyTournamentsBtn from "./Tournament/MyTournamentsBtn";
import TournamentCreateBtn from "./Tournament/TournamentCreateBtn";

const Header = ({page}) => {
    const [logged, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownTournamentVisible, setDropdownTournamentVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLogin(true);
        }
    }, []);

    const logoff = () => {
        localStorage.removeItem('user');
        setLogin(false);
        navigate('/leaderboard');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const toggleDropdownTournament = () => {
        setDropdownTournamentVisible(!dropdownTournamentVisible);
    };

    return (
        <header className="common-header">
            <div className="image-content">
                <img src={negativeLogo} alt="Отрицательный логотип Trybe Futebol Clube"/>
            </div>
            <div className="buttons-content">
                <LeaderboardBtn/>
                <NewsBtn/>
                <AthleteBtn/>
                {logged && user?.role === 'admin' ? (
                    <div className="dropdown">
                        <button type="button" onClick={toggleDropdownTournament}>
                            Турниры
                        </button>
                        {dropdownTournamentVisible && (
                            <div className="dropdown-menu">
                                <AllTournamentsBtn/>
                                <MyTournamentsBtn/>
                            </div>
                        )}
                    </div>
                ) : <TournamentsBtn/>}
                {logged && user?.role === 'admin' && (
                    <div className="dropdown">
                        <button type="button" onClick={toggleDropdown}>
                            Создать
                        </button>
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <NewsCreateBtn/>
                                <AthleteCreateBtn/>
                                <TournamentCreateBtn/>
                            </div>
                        )}
                    </div>
                )}
                {logged ? (
                    <>
                        <MyProfileBtn/>
                        <button type="button" onClick={logoff}>
                            Выйти
                            <img src={exitToAppImg} alt="Выйти из приложения"/>
                        </button>
                    </>
                ) : (
                    <LoginBtn/>
                )}
            </div>
        </header>
    );
};

export default Header;
