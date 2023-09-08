import React from 'react';
import '../Navigation/Navigation.css';
import { useState } from 'react';
import { Link, Route, Routes, useLocation, Navigate, NavLink } from 'react-router-dom';
import burgerIconWhite from '../../images/burger__button_white.svg';
import burgerIcon from '../../images/burger_icon.svg';
import BurgerMenu from './BurgerMenu';

function Navigation(props) {
  const [mobile, setMobile] = useState(false);
  const [user, setUser] = useState(false);
  const location = useLocation();
  //Переключатель мобильного меню
  function setMenu() {
    setMobile(!mobile);
  }
  let headerLinkClass = 'header__link header__link_black';
  if (mobile) {
    //  конкатенировать классы навигации
    headerLinkClass += ' header__link_active';
  } else if (!mobile && window.location.pathname === !'/saved-movies') {
    headerLinkClass += ' header__link_black';
  } else if (!mobile && window.location.pathname === '/saved-movies') {
    headerLinkClass += ' header__link_black ';
  }

  if (location.pathname === '/' && !user) {
    return (
      <nav className="header__main-container">
        {/* <BurgerMenu onClick={setMenu} icon={burgerIconWhite} mobile={mobile}></BurgerMenu> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <div className={mobile ? ['header__overlay', 'header_open'].join(' ') : ['']}></div> */}
                <ul
                  className="header__main-wrapper"
                  // {
                  //   // mobile
                  //   //   ? ['header__wrapper', 'header_open'].join(' ')
                  //   //   : ['header__wrapper header__wrapper_main']
                  // }
                >
                  <Link
                    to="/signup"
                    className="header__main-link header__link_wh"
                    // {
                    //
                    //   // mobile
                    //   //   ? ['header__link', 'header__link_active'].join(' ')
                    //   //   : ['header__link header__link_wh']
                    // }
                  >
                    Регистрация
                  </Link>

                  <Link
                    to="/signin"
                    className="header__main-link header__link_green"
                    // {
                    //
                    //   // mobile
                    //   //   ? ['header__link', 'header__link_active'].join(' ')
                    //   //   : ['header__link', 'header__link_green'].join(' ')
                    // }
                  >
                    Войти
                  </Link>
                </ul>
              </>
            }
          />
        </Routes>
      </nav>
    );
  }
  if (location.pathname === '/' && user) {
    return (
      <nav className="header__container">
        <BurgerMenu onClick={setMenu} icon={burgerIconWhite} mobile={mobile}></BurgerMenu>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className={mobile ? ['header__overlay', 'header_open'].join(' ') : ['']}></div>
                <ul
                  className={
                    mobile ? ['header__wrapper', 'header_open'].join(' ') : ['header__wrapper']
                  }
                >
                  <Link
                    to="/"
                    className={
                      mobile
                        ? ['header__link', 'header__link_active'].join(' ')
                        : ['header__link_hidden']
                    }
                  >
                    Главная
                  </Link>

                  <Link
                    to="/movies"
                    className={
                      mobile
                        ? ['header__link', 'header__link_active'].join(' ')
                        : ['header__link header__link_wh']
                    }
                  >
                    Фильмы
                  </Link>
                  <Link
                    to="/saved-movies"
                    className={
                      mobile
                        ? ['header__link', 'header__link_active'].join(' ')
                        : ['header__link header__link_wh']
                    }
                  >
                    Сохраненный фильмы
                  </Link>
                  <Link
                    to="/profile"
                    className={
                      mobile
                        ? ['header__link', 'header__link_active'].join(' ')
                        : ['header__link header__link_gray']
                    }
                  >
                    Аккаунт
                  </Link>
                </ul>
              </>
            }
          />
        </Routes>
      </nav>
    );
  }
  if (location.pathname === '/movies' || '/saved-movies' || '/profile') {
    return (
      <nav className="header__container">
        <BurgerMenu onClick={setMenu} icon={burgerIcon} mobile={mobile}></BurgerMenu>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className={mobile ? ['header__overlay', 'header_open'].join(' ') : ['']}></div>
                <ul
                  className={
                    mobile ? ['header__wrapper', 'header_open'].join(' ') : ['header__wrapper']
                  }
                >
                  <Link
                    to="/"
                    className={
                      mobile
                        ? ['header__link', 'header__link_active'].join(' ')
                        : ['header__link_hidden']
                    }
                  >
                    Главная
                  </Link>
                  <NavLink to="/movies" className={headerLinkClass}>
                    Фильмы
                  </NavLink>
                  <NavLink to="/saved-movies" className={headerLinkClass}>
                    Сохраненный фильмы
                  </NavLink>
                  <Link
                    to="/profile"
                    className={
                      mobile
                        ? ['header__link', 'header__link_active'].join(' ')
                        : ['header__link header__link_gray']
                    }
                  >
                    Аккаунт
                  </Link>
                </ul>
              </>
            }
          />
        </Routes>
      </nav>
    );
  } else {
    return <Navigate to="/" />;
  }
}
export default Navigation;
