import './FilterCheckbox.css';
import { React } from 'react';
import { useLocation } from 'react-router-dom';

function FilterCheckbox(props) {
  const location = useLocation();

  const handleChange = event => {
    if (location.pathname === '/movies') {
      event.preventDefault();
      props.setIsChecked(event.target.checked);
    }
  };

  function handleCheckboxClick(e) {
    e.preventDefault();
    if (location.pathname === '/movies') {
      props.onSearchQuery({ query: JSON.parse(localStorage.getItem('query')) }, e.target.checked);
    }
  }
  return (
    <div className="filter-box">
      <div className="filter-box__container">
        <label className="filter-box__checkbox">
          <input
            className="filter-box__input"
            type="checkbox"
            checked={location.pathname === '/movies' ? props.isChecked : props.checkbox}
            onChange={handleChange}
            onClick={
              location.pathname === '/movies'
                ? handleCheckboxClick
                : e => {
                    props.setCheckbox(e.target.checked);
                  }
            }
          ></input>
          <span className="filter-box__switch"></span>
           Короткометражка
        </label>
      </div>
    </div>
  );
}

export default FilterCheckbox;
