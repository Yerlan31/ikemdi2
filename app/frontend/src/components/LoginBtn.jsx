import React from 'react';
import { Link } from 'react-router-dom';

const LoginBtn = () => (
  <Link data-testid="header__login_btn" to="/login">
      Авторизоваться
  </Link>
);

export default LoginBtn;
