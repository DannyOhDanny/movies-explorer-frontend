import { React } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      {props.isLoading ? <Preloader></Preloader> : ''}
      <Header></Header>
      <SearchForm
        onSearchQuery={props.handleSearchQuery}
        isChecked={props.isChecked}
        setIsChecked={props.setIsChecked}
        errors={props.errors}
        infoMessage={props.infoMessage}
        movieQuery={props.movieQuery}
      ></SearchForm>
      <FilterCheckbox
        isChecked={props.isChecked}
        setIsChecked={props.setIsChecked}
        onSearchQuery={props.handleSearchQuery}
        setMovies={props.setMovies}
        setSavedMovieList={props.setSavedMovieList}
      ></FilterCheckbox>
      <MoviesCardList
        loadMore={props.loadMore}
        isSaved={props.isSaved}
        onMovieDelete={props.onMovieDelete}
        movies={props.movies}
        movieIsNotFound={props.movieIsNotFound}
        onMovieClick={props.onMovieClick}
        currentMoviePage={props.currentMoviePage}
        readLess={props.readLess}
        savedMovies={props.savedMovies}
        setErrors={props.setErrors}
        isLoading={props.isLoading}
      ></MoviesCardList>
      <Footer></Footer>
    </>
  );
}

export default Movies;
