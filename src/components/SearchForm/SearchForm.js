import './SearchForm.css';
import React from 'react';

function SearchForm() {
  return (
    <section className="search-form">
      <form
        className="search-form__container search-form__container_cf"
        action=""
        method="get"
        id="search-form"
      >
        <input
          className="search-form__input"
          name="search-form"
          placeholder="Фильм"
          type="search"
        ></input>
        <button className="search-form__button" type="submit"></button>
      </form>
      <span></span>
    </section>
  );
}

export default SearchForm;
