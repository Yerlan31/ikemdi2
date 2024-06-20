import React from 'react';
import { Link } from 'react-router-dom';

const NewsBtn = () => (
  <Link data-testid="header__show_matches_btn" to="/news">
      Новости
  </Link>
);

export default NewsBtn;
