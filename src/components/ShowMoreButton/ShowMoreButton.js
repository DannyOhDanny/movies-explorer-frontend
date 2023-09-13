import './ShowMoreButton.css';
import React from 'react';

function ShowMoreButton(props) {
  return (
    <div className="show-more">
      <button className="show-more__button " aria-label="show-more" type="button">
        Ещё
      </button>
    </div>
  );
}

export default ShowMoreButton;
