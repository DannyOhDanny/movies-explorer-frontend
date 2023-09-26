import './MoviesCard.css';
import { React, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {
  const user = useContext(CurrentUserContext);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  // Лайк сохраненного фильма
  let isLiked;
  if (location.pathname === '/movies') {
    isLiked = props.savedMovies.some(
      i => i.movieId === props.movie.id && i.owner === user.currentUser._id
    );
  }
  // Обработка клика
  function handleClick(e) {
    if (!isLiked) {
      props.onMovieClick(props.movie);
      setIsClicked(true);
    }
    if (isLiked) {
      const movieToDelete = props.savedMovies.find(el => el.movieId === props.movie.id);
      props.onMovieDelete(movieToDelete ? movieToDelete._id : '');
      setIsClicked(false);
    }
  }
  // Удаление сохраненного фильма
  function handleDelete() {
    props.onMovieDelete(props.movie._id);
  }
  // Конвертер минуты в часы
  function getTimeFromMins(duration) {
    let hours = Math.trunc(duration / 60);
    let minutes = duration % 60;
    return `${hours ? hours + 'ч ' : ''}${minutes ? minutes + 'м' : ''}`;
  }

  const likeBtnClass = `movie-card__like ${isClicked || isLiked ? 'movie-card__like_active' : ''}
  ${location.pathname === '/saved-movies' ? 'movie-card__like_cross' : ''}`;

  return (
    <article className="movie-card">
      <a
        href={props.movie.trailerLink}
        target="_blank"
        className="movie-card__link"
        rel="noreferrer noopener"
      >
        <img
          alt={location.pathname === '/saved-movies' ? props.movie.nameRU : props.movie.image.name}
          className="movie-card__preview"
          src={
            location.pathname === '/saved-movies'
              ? props.movie.image
              : `https://api.nomoreparties.co/${props.movie.image.url}`
          }
        />
      </a>
      <div className="movie-card__container">
        <div className="movie-card__wrapper">
          <h2 className="movie-card__title">{props.movie.nameRU}</h2>
          <button
            value={isClicked}
            onClick={location.pathname === '/saved-movies' ? handleDelete : handleClick}
            // onChange={() => {
            //   setIsClicked(!isClicked);
            // }}
            className={likeBtnClass}
            aria-label="like"
            type="button"
            disabled={props.isLoading ? true : false}
          ></button>
        </div>
        <p className="movie-card__time">{getTimeFromMins(props.movie.duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
