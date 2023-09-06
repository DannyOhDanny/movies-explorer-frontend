import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies(props) {
  return (
    <>
      <Header></Header>
      <SearchForm></SearchForm>
      <FilterCheckbox></FilterCheckbox>
      <MoviesCardList movies={props.movies}></MoviesCardList>
      <div className="saved-movies__container"></div>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
