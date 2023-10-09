import { React, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import MoviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import {
  SERVER_ERR,
  VALIDATION_ERR,
  ROW_2,
  ROW_3,
  ROW_4,
  ROW_5,
  WIN_1279,
  WIN_1278,
  WIN_990,
  WIN_989,
  WIN_708,
  WIN_707,
  WIN_320
} from '../../utils/constants';

function App() {
  // Стейты фильмов
  const [allMovies, setMovies] = useState([]);
  const [savedMovieList, setSavedMovieList] = useState([]);
  const [movieQuery, setMovieQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [movieIsNotFound, setMovieIsNotFound] = useState(false);
  // Стейты пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Стейты размера окна и кол-ва страниц
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState('');
  const lastIndex = currentPage * moviesPerPage;
  const firstIndex = lastIndex - moviesPerPage;
  const currentMoviePage = allMovies.slice(firstIndex, lastIndex);
  // Обработчик размера окна
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [windowSizeChanged, setWindowSizeChanged] = useState(false);
  // Стейт кнопки ЕЩЕ
  const [readLess, setReadLess] = useState(Boolean);
  // Стейт формы сохр. фильмов и чекбокса
  const [savedSearchQuery, setSavedSearchQuery] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  // Стейты навигации
  const navigate = useNavigate();
  const location = useLocation();
  // Стейты ошибок(серверные и формы) и информационных сообщений
  const [errors, setErrors] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  // Устанавливаем хендлер на ресайз окна
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([{ width: window.innerWidth, height: window.innerHeight }]);
      setWindowSizeChanged(true);
    };

    window.addEventListener('resize', handleWindowResize);

    if (windowSize[0].width >= WIN_1279) {
      setMoviesPerPage(ROW_4);
    }
    if (windowSize[0].width <= WIN_1278 && windowSize[0].width >= WIN_990) {
      setMoviesPerPage(ROW_3);
    }
    if (windowSize[0].width <= WIN_989 && windowSize[0].width >= WIN_708) {
      setMoviesPerPage(ROW_2);
    }
    if (windowSize[0].width <= WIN_707 && windowSize[0].width >= WIN_320) {
      setMoviesPerPage(ROW_5);
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize, windowSizeChanged]);

  //Отображение одного ряда карточек при загрузке страницы
  useEffect(() => {
    if (windowSize[0] >= WIN_1279) {
      setMoviesPerPage(ROW_4);
    }
    if (windowSize[0] <= WIN_1278 && windowSize[0] >= WIN_990) {
      setMoviesPerPage(ROW_3);
    }
    if (windowSize[0] <= WIN_989 && windowSize[0] >= WIN_708) {
      setMoviesPerPage(ROW_2);
    }
    if (windowSize[0] <= WIN_707 && windowSize[0] >= WIN_320) {
      setMoviesPerPage(ROW_5);
    }
  }, [windowSize]);

  // Загружаем установленное кол-во карточек, в зависимости от изменения размера окна, по клику кнопки ЕЩЕ
  const loadMore = () => {
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) >= WIN_1279) {
      setMoviesPerPage(moviesPerPage + 4);
    }
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) <= WIN_1278) {
      setMoviesPerPage(moviesPerPage + 3);
    }
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) <= WIN_990) {
      setMoviesPerPage(moviesPerPage + 2);
    }
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) <= WIN_707) {
      setMoviesPerPage(moviesPerPage + 1);
    }
  };

  // Убираем кнопку ЕЩЕ при загрузки полного списка фильмов
  useEffect(() => {
    if (currentMoviePage.length === allMovies.length) {
      setReadLess(true);
    } else {
      setReadLess(false);
    }
  }, [readLess, currentMoviePage.length, allMovies.length]);

  function handleNavigate() {
    if (location.pathname === '/movies' || '/saved-movies' || '/profile') {
      navigate('/404', { replace: true });
    }
    if (location.pathname === '/signin') {
      navigate('/signin', { replace: true });
    }
    if (location.pathname === '/signup') {
      navigate('/signup', { replace: true });
    }
    if (location.pathname === '/') {
      navigate('/', { replace: true });
    }
    if (location.pathname === '/*') {
      navigate('/', { replace: true });
    }
  }
  //Проверка токена
  const checkToken = () => {
    mainApi
      .getContent()
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
        }
        if (!res) {
          return;
        }
      })
      .catch(err => {
        setIsLoggedIn(false);
        //ошибки с сервера -
        setErrors(err.message);
        handleNavigate();
      })
      .finally(() => {
        setTimeout(() => {
          setErrors(null);
        }, 3000);
      });
  };

  //Отрисовка токена 1 раз
  useEffect(() => {
    checkToken();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoggedIn)
      setTimeout(() => {
        setInfoMessage(null);
        setErrors(null);
      }, 3000);
  }, [isLoggedIn, infoMessage]);

  // Сохранение в избранном
  function handleSaveMovie(data, setIsLiked) {
    if (isLoggedIn) {
      setIsLoading(true);
      if (isLoggedIn) {
        mainApi
          .saveMovie(data)
          .then(savedMovie => {
            setSavedMovieList([savedMovie, ...savedMovieList]);
            setInfoMessage(savedMovie.message);
            setIsLiked(true);
          })
          .catch(err => {
            //ошибки с сервера -
            setErrors(data.message);
          })
          .finally(() => {
            setTimeout(() => {
              setErrors(null);
              setInfoMessage(null);
            }, 3000);
            setIsLoading(false);
          });
      }
    }
  }
  // Удаление из избранного
  function handleMovieDelete(id, setIsLiked) {
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi
        .deleteSavedMovie(id)
        .then(movie => {
          const savedMovies = savedMovieList.filter(savedMovie => movie._id !== savedMovie._id);
          setSavedMovieList(savedMovies);
          setInfoMessage(movie.message);
          setIsLiked(false);
        })
        .catch(err => {
          setErrors(err.statusCode);
        })
        .finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            setErrors(null);
            setInfoMessage(null);
          }, 4000);
        });
    }
  }

  // Отображение сохраненных фильмов
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      mainApi
        .getSavedMovies()
        .then(data => {
          const myFavourites = data.movies.filter(el => el.owner === currentUser._id);
          setSavedMovieList(myFavourites.reverse());
          setTimeout(() => {
            setInfoMessage(data.message);
          }, 2000);
        })
        .catch(err =>
          //ошибки с сервера
          setErrors(err.message)
        )
        .finally(() => {
          setErrors(null);
          setInfoMessage(null);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isLoggedIn]);

  function handleSaveSearch(query) {
    setSavedSearchQuery(query);
  }

  // Поиск фильмов /movies
  function handleSearchQuery({ query }, isChecked) {
    if (isLoggedIn) {
      setMovieIsNotFound(true);
      setIsLoading(true);
      MoviesApi.getMovieCardsFromServer()
        .then(movies => {
          const movieSearchList = movies
            .filter(
              item =>
                item.nameRU.toLowerCase().includes(query.toLowerCase()) ||
                item.nameEN.toLowerCase().includes(query.toLowerCase())
            )
            .filter(shortMovie => (isChecked ? shortMovie.duration <= 40 : shortMovie.duration));
          movieSearchList.length === 0 ? setMovieIsNotFound(true) : setMovieIsNotFound(false);
          setMovies(movieSearchList);
          localStorage.setItem('query', JSON.stringify(query));
          localStorage.setItem('isChecked', JSON.stringify(isChecked));
          localStorage.setItem('movieSearchList', JSON.stringify(movieSearchList));
          localStorage.setItem('allMovies', JSON.stringify(allMovies));
          setMovieQuery(query);
        })
        .catch(err => {
          setErrors(SERVER_ERR);
        })
        .finally(() => {
          setErrors(null);
          setIsLoading(false);
        });
    } else {
      return;
    }
  }
  // Оторисовка результатов при повторном переходе /movies, /saved-movies
  useEffect(() => {
    if (location.pathname === '/movies') {
      const query = JSON.parse(localStorage.getItem('query'));
      const isChecked = JSON.parse(localStorage.getItem('isChecked'));
      const search = JSON.parse(localStorage.getItem('movieSearchList'));
      setMovieQuery(query);
      setMovies(search ? search : allMovies);
      setIsChecked(isChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setSavedSearchQuery('');
      setCheckbox(false);
      setSavedMovieList(savedMovieList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  //Ф-ия регистрации пользователя
  function handleRegister(formValue, setErrorMessage, setInfo) {
    if (!formValue.email || !formValue.password || !formValue.name) {
      setErrorMessage(VALIDATION_ERR);
      return;
    }
    const { email, password, name } = formValue;
    setIsLoading(true);
    mainApi
      .register({ email, password, name })
      .then(data => {
        setTimeout(() => {
          setInfo(data.message);
        }, 1000);
        handleLogin({ email, password });
      })
      .catch(err => {
        setErrors(err.message);
      })
      .finally(() => {
        setInfo(null);
        setErrorMessage(null);
        setIsLoading(false);
        setErrors(null);
      });
  }

  // Функция авторизации пользователя
  function handleLogin(formValue, setErrorMessage) {
    if (!formValue.email || !formValue.password) {
      setErrorMessage(VALIDATION_ERR);
      return;
    }
    const { email, password } = formValue;
    setIsLoading(true);
    mainApi
      .login({ email, password })
      .then(data => {
        setTimeout(() => {
          setInfoMessage(data.message);
        }, 3000);
        setIsLoggedIn(true);

        navigate('/movies', { replace: true });
      })
      .catch(err => {
        setErrors(err.message);
      })
      .finally(() => {
        // setErrorMessage(null);
        setInfoMessage(null);
        setIsLoading(false);
      });
  }

  //Ф-ия выхода, удаления токена и обнуления стейтов после выхода
  function signOut() {
    setIsLoading(true);
    mainApi
      .logout()
      .then(res => {
        if (res) {
          setInfoMessage(res.message);
          localStorage.removeItem('query');
          localStorage.removeItem('movieSearchList');
          localStorage.removeItem('isChecked');
          localStorage.removeItem('allMovies');
          window.sessionStorage.removeItem('lastRoute');
          setMovies([]);
          setSavedMovieList([]);
          setMovieQuery('');
          setCurrentUser('');
          setIsLoggedIn(false);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        //ошибки с сервера -
        setErrors(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  // Отрисовка данных пользователя
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then(data => {
          setCurrentUser({
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email
          });
        })
        .catch(err => {
          //ошибки с сервера -
          setErrors(err.message);
        });
    } else {
      return;
    }
  }, [isLoggedIn]);

  // Обновление данных пользователя
  function handleUpdateUser({ name, email }, setInfo, setErr) {
    setIsLoading(true);
    mainApi
      .updateUserInfo({ name, email })
      .then(data => {
        setCurrentUser(data.user);
        setErr(null);
        setInfo(data.message);
      })
      .catch(err => {
        setErrors(err.message);
        setErr(err.validation ? err.validation.body.message : '');
      })
      .finally(() => {
        setErrors(null);
        setErr(null);
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        isLoggedIn: isLoggedIn
      }}
    >
      <div className="page">
        <Routes>
          <Route path="/" element={<Main errors={errors} infoMessage={infoMessage} />} />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/"></Navigate>
              ) : (
                <Register onRegister={handleRegister} isLoading={isLoading} errors={errors} set />
              )
            }
          />

          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/"></Navigate>
              ) : (
                <Login handleLogin={handleLogin} isLoading={isLoading} errors={errors} set />
              )
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                redirectPath={'/movies'}
                element={Movies}
                allMovies={allMovies}
                setMovies={setMovies}
                savedMovieList={savedMovieList}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                movieQuery={movieQuery}
                setMovieQuery={setMovieQuery}
                handleSearchQuery={handleSearchQuery}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                movieIsNotFound={movieIsNotFound}
                setMovieIsNotFound={setMovieIsNotFound}
                onMovieClick={handleSaveMovie}
                onMovieDelete={handleMovieDelete}
                loadMore={loadMore}
                currentMoviePage={currentMoviePage}
                readLess={readLess}
                errors={errors}
                setErrors={setErrors}
                infoMessage={infoMessage}
              ></ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                redirectPath={'/saved-movies'}
                element={SavedMovies}
                savedMovieList={savedMovieList}
                setSavedMovieList={setSavedMovieList}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                savedQuery={savedSearchQuery}
                setSavedSearchQuery={setSavedSearchQuery}
                handleSaveSearch={handleSaveSearch}
                onMovieDelete={handleMovieDelete}
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                setMovieIsNotFound={setMovieIsNotFound}
                errors={errors}
                setErrors={setErrors}
                infoMessage={infoMessage}
              ></ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                redirectPath={'/profile'}
                element={Profile}
                onLogout={signOut}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                errors={errors}
                infoMessage={infoMessage}
              ></ProtectedRoute>
            }
          />
          <Route path="/*" element={<Page404 isLoggedIn={isLoggedIn} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
