import './Form.css';
import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Form(props) {
  return (
    <form onSubmit={props.onSubmit} id="form" className="form">
      <Link className="form__logo" to="/">
        <img src={logo} alt="Лого" title="лого"></img>
      </Link>
      <h2 className="form__title"> {props.greetingTxt}</h2>
      {props.children}
      <button
        type="submit"
        aria-label="save"
        disabled={props.isDisabled}
        className="form__submit-btn"
      >
        {props.btnName}
      </button>
      <p className="form__action-text">
        {props.actionTxt}
        <Link to={props.path} className="form__action-btn">
          {props.btnName2}
        </Link>
      </p>
    </form>
  );
}

export default Form;
