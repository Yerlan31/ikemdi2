import React from 'react';
import { Link } from 'react-router-dom';

const TournamentsBtn = () => (
  <Link data-testid="header__show_matches_btn" to="/tournaments">
      Турниры
  </Link>
);

export default TournamentsBtn;
