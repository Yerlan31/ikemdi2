import React from 'react';
import { Link } from 'react-router-dom';

const NewsCreateBtn = () => (
  <Link data-testid="header__show_matches_btn" to="/news/create">
      Новости
  </Link>
);

export default NewsCreateBtn;
