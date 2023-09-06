import React from 'react';
import '../Navigation/Navigation.css';
import btnClose from '../../images/btnClose.svg';

function BurgerMenu(props) {
  return (
    <img
      onClick={props.onClick}
      className="mobile_btn"
      src={props.mobile ? btnClose : props.icon}
      alt="burger-icon888"
    ></img>
  );
}
export default BurgerMenu;
