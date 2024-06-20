import React from 'react';
import { Link } from 'react-router-dom';

const TournamentCreateBtn = () => (
  <Link data-testid="header__show_matches_btn" to="/tournament/create">
      Турниры
  </Link>
);

export default TournamentCreateBtn;
