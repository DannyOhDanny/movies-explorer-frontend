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
          {props.currentMoviePage.map((movie, key) => {
            return (
              <MoviesCard
                onMovieClick={props.onMovieClick}
                onMovieDelete={props.onMovieDelete}
                movie={movie}
                allMovies={props.allMovies}
                key={movie.id}
                isLoading={props.isLoading}
                savedMovieList={props.savedMovieList}
                setErrors={props.setErrors}
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
  if (location.pathname === '/movies' && props.movieIsNotFound) {
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
        return props.savedMovieList.map((movie, key) => {
          return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
        });
      } else if (!props.savedQuery && props.checkbox) {
        return props.savedMovieList
          .filter(shortMovie => shortMovie.duration <= 40)
          .map((movie, key) => {
            return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
          });
      } else if (props.savedQuery && !props.checkbox) {
        return props.savedMovieList
          .filter(
            movie =>
              movie.nameRU.toLowerCase().includes(props.savedQuery.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(props.savedQuery.toLowerCase())
          )
          .map((movie, key) => {
            return <MoviesCard movie={movie} key={movie._id} onMovieDelete={props.onMovieDelete} />;
          });
      } else if (props.savedQuery && props.checkbox) {
        return props.savedMovieList
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
        return props.savedMovieList.map((movie, key) => {
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
