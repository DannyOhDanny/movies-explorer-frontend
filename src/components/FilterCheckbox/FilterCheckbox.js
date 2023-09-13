import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox() {
  return (
    <div className="filter-box">
      <div className="filter-box__container">
        <label className="filter-box__checkbox">
          <input className="filter-box__input" type="checkbox"></input>
          <span className="filter-box__switch"></span>
           Короткометражка
        </label>
      </div>
    </div>
  );
}

export default FilterCheckbox;
