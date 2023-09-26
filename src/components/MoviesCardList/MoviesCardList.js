import './MoviesCardList.css';
import { React } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

function MoviesCardList(props) {
  const location = useLocation();

  if (location.pathname === '/movies' && !props.movieIsNotFound) {
    return (
      <>
        <div id="movies-list" className="movies-list">
          {props.currentMoviePage.map((movie, key, idex) => {
            return (
              <MoviesCard
                onMovieClick={props.onMovieClick}
                onMovieDelete={props.onMovieDelete}
                movie={movie}
                key={movie.id}
                isSaved={props.isSaved}
                savedMovies={props.savedMovies}
                allMovies={props.allMovies}
                setErrors={props.setErrors}
                isLoading={props.isLoading}
              />
            );
          })}
        </div>
        <ShowMoreButton
          onShowMore={props.loadMore}
          movieIsNotFound={props.movieIsNotFound}
          readLess={props.readLess}
        ></ShowMoreButton>
      </>
    );
  }
  if (
    (location.pathname === '/movies' || location.pathname === '/saved-movies') &&
    props.movieIsNotFound
  ) {
    return (
      <div id="not-found" className="not-found">
        <p className="not-found__text">
          По вашему запросу ничего не найдено, введите новое ключевое слово в поисковую строку
        </p>
      </div>
    );
  }

  if (location.pathname === '/saved-movies') {
    const render = () => {
      if (!props.savedQuery && !props.checkbox) {
        return props.movies.map((movie, key) => {
          return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
        });
      } else if (!props.savedQuery && props.checkbox) {
        return props.movies
          .filter(shortMovie => shortMovie.duration <= 40)
          .map((movie, key) => {
            return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
          });
      } else if (props.savedQuery && !props.checkbox) {
        return props.movies
          .filter(
            movie =>
              movie.nameRU.toLowerCase().includes(props.savedQuery.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(props.savedQuery.toLowerCase())
          )
          .map((movie, key) => {
            return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
          });
      } else if (props.savedQuery && props.checkbox) {
        return props.movies
          .filter(
            movie =>
              movie.nameRU.toLowerCase().includes(props.savedQuery.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(props.savedQuery.toLowerCase())
          )
          .filter(shortMovie => shortMovie.duration <= 40)
          .map((movie, key) => {
            return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
          });
      } else {
        return props.movies.map((movie, key) => {
          return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
        });
      }
    };

    return (
      <div id="movies-list" className="movies-list">
        {render()}
      </div>
    );
  }
}

export default MoviesCardList;
