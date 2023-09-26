import React from 'react';
import '../Navigation/Navigation.css';
import { useState, useContext } from 'react';
import { Link, useLocation, Navigate, NavLink } from 'react-router-dom';
import burgerIconWhite from '../../images/burger__button_white.svg';
import burgerIcon from '../../images/burger_icon.svg';
import BurgerMenu from './BurgerMenu';
import HeaderMain from './HeaderMain';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation(props) {
  const user = useContext(CurrentUserContext);
  const [mobile, setMobile] = useState(false);
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

  if (location.pathname === '/' && !user.isLoggedIn) {
    return <HeaderMain></HeaderMain>;
  }
  if (location.pathname === '/' && user.isLoggedIn) {
    return (
      <nav className="header__container">
        <BurgerMenu onClick={setMenu} icon={burgerIconWhite} mobile={mobile}></BurgerMenu>

        <>
          <div
            className={mobile ? ['header__overlay', 'header__wrapper_open'].join(' ') : ['']}
          ></div>
          <ul
            className={
              mobile ? ['header__wrapper', 'header__wrapper_open'].join(' ') : ['header__wrapper']
            }
          >
            <li
              className={
                mobile
                  ? ['header__list', 'header__list_active'].join(' ')
                  : ['header__list header__list_hidden']
              }
            >
              <Link
                to="/"
                className={
                  mobile
                    ? ['header__link', 'header__link_active'].join(' ')
                    : ['header__link header__link_hidden']
                }
              >
                Главная
              </Link>
            </li>
            <li
              className={
                mobile ? ['header__list', 'header__list_active'].join(' ') : ['header__list']
              }
            >
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
            </li>
            <li
              className={
                mobile ? ['header__list', 'header__list_active'].join(' ') : ['header__list']
              }
            >
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
            </li>
            <li
              className={
                mobile ? ['header__list', 'header__list_active'].join(' ') : ['header__list ']
              }
            >
              <Link
                to="/profile"
                className={
                  mobile
                    ? ['header__link', 'header__link_gray_active'].join(' ')
                    : ['header__link header__link_gray']
                }
              >
                Аккаунт
              </Link>
            </li>
          </ul>
        </>
      </nav>
    );
  }
  if (location.pathname === '/movies' || '/saved-movies' || '/profile') {
    return (
      <nav className="header__container">
        <BurgerMenu onClick={setMenu} icon={burgerIcon} mobile={mobile}></BurgerMenu>

        <>
          <div
            className={mobile ? ['header__overlay', 'header__wrapper_open'].join(' ') : ['']}
          ></div>
          <ul
            className={
              mobile ? ['header__wrapper', 'header__wrapper_open'].join(' ') : ['header__wrapper']
            }
          >
            <li>
              <Link
                to="/"
                className={
                  mobile
                    ? ['header__link', 'header__link_active'].join(' ')
                    : ['header__link header__link_hidden']
                }
              >
                Главная
              </Link>
            </li>
            <li
              className={
                mobile ? ['header__list', 'header__list_active'].join(' ') : ['header__list ']
              }
            >
              <NavLink to="/movies" className={headerLinkClass}>
                Фильмы
              </NavLink>
            </li>
            <li
              className={
                mobile ? ['header__list', 'header__list_active'].join(' ') : ['header__list ']
              }
            >
              <NavLink to="/saved-movies" className={headerLinkClass}>
                Сохраненный фильмы
              </NavLink>
            </li>

            <li
              className={
                mobile ? ['header__list', 'header__list_active'].join(' ') : ['header__list ']
              }
            >
              <Link
                to="/profile"
                className={
                  mobile
                    ? ['header__link', 'header__link_gray_active'].join(' ')
                    : ['header__link header__link_gray']
                }
              >
                Аккаунт
              </Link>
            </li>
          </ul>
        </>
      </nav>
    );
  } else {
    return <Navigate to="/" />;
  }
}
export default Navigation;
