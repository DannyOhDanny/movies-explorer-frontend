import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <div id="movies-list" className="movies-list">
      {props.movies.map(movie => {
        return <MoviesCard movie={movie} key={movie.movieId} />;
      })}
    </div>
  );
}

export default MoviesCardList;
