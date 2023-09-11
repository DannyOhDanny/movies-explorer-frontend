import React from 'react';
import './HeaderMain.css';
import { Link, Route, Routes, useLocation, Navigate, NavLink } from 'react-router-dom';

function HeaderMain(props) {
  return (
    <nav className="header__main-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
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
          }
        />
      </Routes>
    </nav>
  );
}

export default HeaderMain;
