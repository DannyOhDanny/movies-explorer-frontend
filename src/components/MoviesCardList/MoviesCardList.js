import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section id="movies-list" className="movies-list">
      {props.movies.map(movie => {
        return <MoviesCard movie={movie} key={movie.movieId} />;
      })}
    </section>
  );
}

export default MoviesCardList;
