import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();

  return (
    <article className="movie-card">
      <a
        href={props.movie.link}
        target="_blank"
        className="movie-card__link"
        rel="noreferrer noopener"
      >
        <img alt="превью" className="movie-card__preview" src={props.movie.thumbnail} />
      </a>
      <div className="movie-card__container">
        <div className="movie-card__wrapper">
          <h2 className="movie-card__title">{props.movie.nameRu}</h2>
          <button
            className={
              location.pathname === '/saved-movies'
                ? 'movie-card__like movie-card__like_cross'
                : 'movie-card__like movie-card__like_active'
            }
            aria-label="like"
            type="button"
          ></button>
        </div>
        <p className="movie-card__time" aria-label="duration">
          {props.movie.duration}
        </p>
      </div>
    </article>
  );
}

export default MoviesCard;
