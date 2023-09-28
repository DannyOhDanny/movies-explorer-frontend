import './MoviesCard.css';
import { React, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCard(props) {
  const user = useContext(CurrentUserContext);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState('');

  useEffect(() => {
    if (location.pathname === '/movies') {
      const isLikeCheck = props.savedMovieList.some(
        i => i.movieId === props.movie.id && i.owner === user.currentUser._id
      );
      if (isLikeCheck) {
        props.allMovies.forEach(element => setIsLiked(true));
      }
      if (!isLikeCheck) {
        props.allMovies.forEach(element => setIsLiked(false));
      }
    }
  }, [setIsLiked, setIsClicked]);

  // Обработка клика
  function handleClick() {
    if ((!isLiked && !isClicked) || (!isLiked && isClicked)) {
      const movieToSave = props.savedMovieList.some(
        el => el.movieId === props.movie.id || el.nameRU === props.movie.nameRU
      );
      if (movieToSave === false || movieToSave === undefined) {
        props.onMovieClick(props.movie, setIsLiked, setIsClicked);
      }
    }
    if ((isLiked && !isClicked) || (isLiked && isClicked)) {
      const movieToDelete = props.savedMovieList.find(
        el => el.movieId === props.movie.id || el.nameRU === props.movie.nameRU
      );
      if (movieToDelete) {
        props.onMovieDelete(movieToDelete._id, setIsLiked, setIsClicked);
      }
    }
  }

  // Удаление сохраненного фильма
  function handleDelete() {
    props.onMovieDelete(props.movie._id);
  }
  // Конвертер минут в часы
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
            value={({ isClicked }, { isLiked })}
            onClick={location.pathname === '/saved-movies' ? handleDelete : handleClick}
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
