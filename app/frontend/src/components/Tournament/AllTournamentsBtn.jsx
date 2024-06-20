import React from 'react';
import { Link } from 'react-router-dom';

const  AllTournamentsBtn = () => (
  <Link data-testid="header__show_matches_btn" to="/tournaments">
      Все
  </Link>
);

export default AllTournamentsBtn;
