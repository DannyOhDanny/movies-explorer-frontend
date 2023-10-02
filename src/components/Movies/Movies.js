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
        movieQuery={props.movieQuery}
        setMovieQuery={props.setMovieQuery}
        errors={props.errors}
        infoMessage={props.infoMessage}
        isLoading={props.isLoading}
      ></SearchForm>
      <FilterCheckbox
        onSearchQuery={props.handleSearchQuery}
        isChecked={props.isChecked}
        setIsChecked={props.setIsChecked}
        setMovies={props.setMovies}
        setSavedMovieList={props.setSavedMovieList}
        isLoading={props.isLoading}
      ></FilterCheckbox>
      <MoviesCardList
        loadMore={props.loadMore}
        onMovieDelete={props.onMovieDelete}
        allMovies={props.allMovies}
        movieIsNotFound={props.movieIsNotFound}
        onMovieClick={props.onMovieClick}
        currentMoviePage={props.currentMoviePage}
        readLess={props.readLess}
        savedMovieList={props.savedMovieList}
        setErrors={props.setErrors}
        isLoading={props.isLoading}
      ></MoviesCardList>
      <Footer></Footer>
    </>
  );
}

export default Movies;
