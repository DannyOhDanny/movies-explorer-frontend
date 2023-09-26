import { React } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  return (
    <>
      {props.isLoading ? <Preloader></Preloader> : ''}
      <Header></Header>
      <SearchForm
        onSavedSearchQuery={props.handleSavedMoviesSearch}
        handleSaveSearch={props.handleSaveSearch}
        checkbox={props.checkbox}
        setCheckbox={props.setCheckbox}
        movies={props.movies}
        errors={props.errors}
        infoMessage={props.infoMessage}
      ></SearchForm>
      <FilterCheckbox
        onSavedSearchQuery={props.handleSavedMoviesSearch}
        checkbox={props.checkbox}
        setCheckbox={props.setCheckbox}
        setSavedMovieList={props.setSavedMovieList}
        savedQuery={props.savedQuery}
      ></FilterCheckbox>
      <MoviesCardList
        movieIsNotFound={props.movieIsNotFound}
        movies={props.movies}
        onSaveMovies={props.onSaveMovies}
        onMovieDelete={props.onMovieDelete}
        allMovies={props.allMovies}
        checkbox={props.checkbox}
        savedQuery={props.savedQuery}
        setSavedSearchQuery={props.setSavedSearchQuery}
        setMovieIsNotFound={props.setMovieIsNotFound}
        setSavedMovieList={props.setSavedMovieList}
      ></MoviesCardList>
      <div className="saved-movies"></div>
      <Footer></Footer>
    </>
  );
}

export default SavedMovies;
