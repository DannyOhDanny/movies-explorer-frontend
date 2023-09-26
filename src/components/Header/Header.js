import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../Header/Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header(props) {
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <header
        className={
          location.pathname === '/' ? ['header'] : ['header', 'header_type_white'].join(' ')
        }
      >
        <a className="header__logo-container" href="#about">
          <img className="header__logo" src={logo} alt="лого" />
        </a>
        {<Navigation></Navigation>}
      </header>
    );
  } else {
    return (
      <header
        className={
          location.pathname === '/' ? ['header'] : ['header', 'header_type_white'].join(' ')
        }
      >
        <Link className="header__logo-container" to="/">
          <img className="header__logo" src={logo} alt="лого" />
        </Link>
        {<Navigation></Navigation>}
      </header>
    );
  }
}
export default Header;
