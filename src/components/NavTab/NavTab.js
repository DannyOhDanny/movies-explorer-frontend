import './NavTab.css';
import React from 'react';

function NavTab(props) {
  return (
    <nav className="navtab">
      <ul className="navtab__list">
        <li>
          <a className="navtab__link" href="#about">
            О проекте
          </a>
        </li>
        <li>
          <a className="navtab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li>
          <a className="navtab__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
