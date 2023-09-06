import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header></Header>
      <SearchForm></SearchForm>
      <FilterCheckbox></FilterCheckbox>
      <MoviesCardList movies={props.movies}></MoviesCardList>
      <ShowMoreButton></ShowMoreButton>
      <Footer></Footer>
    </>
  );
}

export default Movies;
