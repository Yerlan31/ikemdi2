import React from 'react';
import {Link} from 'react-router-dom';

const MyTournamentsBtn = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    return <Link data-testid="header__show_matches_btn" to={`/tournaments/${user.id}`}>Мои</Link>
};

export default MyTournamentsBtn;
