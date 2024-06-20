import React from 'react';
import { Link } from 'react-router-dom';

const MyProfileBtn = () => (
    <Link data-testid="header__show_matches_btn" to="/my/profile">
        Мой Профиль
    </Link>
);

export default MyProfileBtn;
