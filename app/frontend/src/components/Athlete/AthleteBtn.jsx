import React from 'react';
import { Link } from 'react-router-dom';

const AthleteBtn = () => (
  <Link data-testid="header__show_matches_btn" to="/athletes">
      Дзюдоисты
  </Link>
);

export default AthleteBtn;
