import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Header/Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';

function Header() {
  const location = useLocation();

  return (
    <header
      className={location.pathname === '/' ? ['header'] : ['header', 'header_type_white'].join(' ')}
    >
      <a className="header__logo-container" href="#about">
        <img className="header__logo" src={logo} alt="лого" />
      </a>
      {<Navigation></Navigation>}
    </header>
  );
}
export default Header;
