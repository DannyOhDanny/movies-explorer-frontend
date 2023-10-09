import './ShowMoreButton.css';
import React from 'react';

function ShowMoreButton(props) {
  return props.movieIsNotFound ? (
    ''
  ) : (
    <div className="show-more">
      <button
        onClick={props.onShowMore}
        className={
          props.readLess ? ' show-more__button show-more__button_hidden' : 'show-more__button'
        }
        aria-label="show-more"
        type="button"
      >
        Ещё
      </button>
    </div>
  );
}

export default ShowMoreButton;
