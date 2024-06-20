import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import { requestLogin } from '../../services/requests';
import { positiveLogo } from '../../images';
import '../../styles/pages/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      const endpoint = '/login';

      const { token, user } = await requestLogin(endpoint, { email, password });

      localStorage.setItem('user', JSON.stringify({ token, ...user }));
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);

  if (isLogged) return <Navigate to="/news" />;

  return (
      <>
        <Header
            page="АВТОРИЗАЦИЯ"
        />
        <section className="user-login-area">
          <img src={ positiveLogo } alt="Trybe Futebol Clube Negative Logo" />
          <form>
            <h1>Область пользователя</h1>
            <label htmlFor="email-input">
              <input
                  className="login__login_input"
                  type="text"
                  value={ email }
                  onChange={ ({ target: { value } }) => setEmail(value) }
                  data-testid="login__login_input"
                  placeholder="Логин"
              />
            </label>
            <label htmlFor="password-input">
              <input
                  type="password"
                  value={ password }
                  onChange={ ({ target: { value } }) => setPassword(value) }
                  data-testid="login__password_input"
                  placeholder="Пароль"
              />
            </label>
            {
              (failedTryLogin)
                  ? (
                      <p data-testid="login__input_invalid_login_alert">
                        {
                          `Неверный адрес электронной почты или пароль.
                    Пожалуйста, попробуйте снова.`
                        }
                      </p>
                  )
                  : null
            }
            <button
                data-testid="login__login_btn"
                type="submit"
                onClick={ (event) => login(event) }
            >
              Войти
            </button>
          </form>
        </section>
      </>
  );
};

export default Login;
