import React from 'react';
import './BurgerMenu.css';
import btnClose from '../../images/btnClose.svg';

function BurgerMenu(props) {
  return (
    <img
      onClick={props.onClick}
      className="header__mobile-btn"
      src={props.mobile ? btnClose : props.icon}
      alt="burger-icon"
    ></img>
  );
}
export default BurgerMenu;
