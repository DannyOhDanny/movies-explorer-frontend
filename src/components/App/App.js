import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Page404 from '../Page404/Page404';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { movies } from '../../utils/moviesList';
import { savedMovies } from '../../utils/savedMovieList';

function App() {
  return (
    <div className="page">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/signup" element={<Register />} />

          <Route path="/signin" element={<Login />} />

          <Route path="/movies" element={<Movies movies={movies}></Movies>} />

          <Route path="/saved-movies" element={<SavedMovies movies={savedMovies}></SavedMovies>} />

          <Route path="/profile" element={<Profile></Profile>} />

          <Route path="/" element={<Navigation to="/signup" replace />} />

          <Route path="/movies" element={<Navigation to="/signin" replace />} />

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
