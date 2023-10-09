import React from 'react';
import './HeaderMain.css';
import { Link } from 'react-router-dom';

function HeaderMain(props) {
  return (
    <nav className="header__main-container">
      <>
        <span
          className={
            props.infoMessage || props.errors
              ? ['header__error', 'header__error_active_green'].join(' ')
              : ['header__error']
          }
        >
          {props.infoMessage || props.errors}
        </span>

        <ul className="header__main-wrapper">
          <li className="header__main-list">
            <Link to="/signup" className="header__main-link header__main-link_white">
              Регистрация
            </Link>
          </li>
          <li className="header__main-list">
            <Link to="/signin" className="header__main-link header__main-link_green">
              Войти
            </Link>
          </li>
        </ul>
      </>
    </nav>
  );
}

export default HeaderMain;
