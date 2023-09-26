import { React, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Page404 from '../Page404/Page404';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import MoviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  // Стейты фильмов
  const [movies, setMovies] = useState([]);
  const [savedMovieList, setSavedMovieList] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
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
  const [movieQuery, setMovieQuery] = useState('');
  const lastIndex = currentPage * moviesPerPage;
  const firstIndex = lastIndex - moviesPerPage;
  const currentMoviePage = movies.slice(firstIndex, lastIndex);
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

    if (windowSize[0].width >= 1279) {
      setMoviesPerPage(4);
    }
    if (windowSize[0].width <= 1278 && windowSize[0].width >= 990) {
      setMoviesPerPage(3);
    }
    if (windowSize[0].width <= 989 && windowSize[0].width >= 708) {
      setMoviesPerPage(2);
    }
    if (windowSize[0].width <= 707 && windowSize[0].width >= 320) {
      setMoviesPerPage(5);
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize, windowSizeChanged]);

  //Отображение одного  ряда карточек при загрузке страницы
  useEffect(() => {
    if (windowSize[0] >= 1279) {
      setMoviesPerPage(4);
    }
    if (windowSize[0] <= 1278 && windowSize[0] >= 990) {
      setMoviesPerPage(3);
    }
    if (windowSize[0] <= 989 && windowSize[0] >= 708) {
      setMoviesPerPage(2);
    }
    if (windowSize[0] <= 707 && windowSize[0] >= 320) {
      setMoviesPerPage(5);
    }
  }, [windowSize]);

  // Загружаем установленное кол-во карточек, в зависимости от изменения размера окна, по клику кнопки ЕЩЕ
  const loadMore = () => {
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) >= 1279) {
      setMoviesPerPage(moviesPerPage + 4);
    }
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) <= 1278) {
      setMoviesPerPage(moviesPerPage + 3);
    }
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) <= 990) {
      setMoviesPerPage(moviesPerPage + 2);
    }
    if ((windowSizeChanged ? windowSize[0].width : windowSize[0]) <= 707) {
      setMoviesPerPage(moviesPerPage + 1);
    }
  };

  // Убираем кнопку ЕЩЕ при загрузки полного списка фильмов
  useEffect(() => {
    if (currentMoviePage.length === movies.length) {
      setReadLess(true);
    } else {
      setReadLess(false);
    }
  }, [readLess, currentMoviePage.length, movies.length]);

  //Проверка токена
  const checkToken = () => {
    mainApi
      .getContent()
      .then(res => {
        if (res) {
          setIsLoggedIn(true);
          navigate('.', { relative: 'path' });
        }
        if (!res) {
          return;
        }
      })
      .catch(err => {
        setIsLoggedIn(false);
        err.then(data => {
          //ошибки с сервера -
          setErrors(data.message);
        });
      })
      .finally(() => {
        setErrors(null);
      });
  };

  //Отрисовка токена 1 раз
  useEffect(() => {
    checkToken();
    //eslint-disable-next-line
  }, []);

  // Сохранение в избранном
  function handleSaveMovie(data) {
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi
        .saveMovie(data)
        .then(savedMovie => {
          setIsSaved(true);
          setSavedMovieList([savedMovie, ...savedMovieList]);
          setInfoMessage(savedMovie.message);
        })
        .catch(err => {
          err.then(data => {
            //ошибки с сервера -
            setErrors(data.message);
          });
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            setErrors(null);
            setInfoMessage(null);
          }, 3000);
        });
    }
  }
  // Удаление из избранного
  function handleMovieDelete(id) {
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi
        .deleteSavedMovie(id)
        .then(movie => {
          setIsSaved(false);
          const savedMovies = savedMovieList.filter(savedMovie => movie._id !== savedMovie._id);
          setSavedMovieList(savedMovies);
          savedMovies.length === 0 ? setMovieIsNotFound(true) : setMovieIsNotFound(false);
          setInfoMessage(movie.message);
        })
        .catch(err => {
          setErrors(err.statusCode);
        })
        .finally(() => {
          setIsLoading(false);
          setTimeout(() => {
            setErrors(null);
            setInfoMessage(null);
          }, 3000);
        });
    } else {
      return;
    }
  }

  // Отображение сохраненных фильмов
  useEffect(() => {
    if (isSaved || location.pathname === '/saved-movies') {
      mainApi
        .getSavedMovies()
        .then(data => {
          const myFavourites = data.movies.filter(el => el.owner === currentUser._id);
          setSavedMovieList(myFavourites.reverse());
          myFavourites.length === 0 ? setMovieIsNotFound(true) : setMovieIsNotFound(false);
          setInfoMessage(data.message);
        })
        .catch(err =>
          err.then(data => {
            //ошибки с сервера
            setErrors(data.message);
          })
        )
        .finally(() => {
          setTimeout(() => {
            setErrors(null);
            setInfoMessage(null);
          }, 3000);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaved, location.pathname]);

  function handleSaveSearch(query) {
    setSavedSearchQuery(query);
  }

  // Поиск фильмов /movies
  function handleSearchQuery({ query }, isChecked, setValue) {
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
      })
      .catch(err => {
        setErrors(err);
      })
      .finally(() => {
        setErrors(null);
        setIsLoading(false);
      });
  }

  // Оторисовка результатов при повторном переходе /movies
  useEffect(() => {
    if (location.pathname === '/movies') {
      const query = JSON.parse(localStorage.getItem('query'));
      const isChecked = JSON.parse(localStorage.getItem('isChecked'));
      handleSearchQuery({ query }, isChecked);
      setMovieQuery(query);
      setTimeout(() => {
        setMovieQuery('');
      }, 3000);
    }
  }, [location.pathname]);

  // Оторисовка результатов при повторном переходе /movies
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setSavedSearchQuery('');
      setCheckbox(false);
    }
  }, [location.pathname, isLoggedIn]);

  //Ф-ия регистрации пользователя
  function handleRegister(formValue, setErrorMessage, setInfo) {
    if (!formValue.email || !formValue.password || !formValue.name) {
      setErrorMessage('Заполните все поля формы');
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
        setTimeout(() => navigate('/signin', { replace: true }), 3000);
      })
      .catch(error => {
        error.then(data => {
          setErrorMessage(data.message);
        });
      })
      .finally(() => {
        setInfo(null);
        setErrorMessage(null);
        setIsLoading(false);
      });
  }

  // Функция авторизации пользователя
  function handleLogin(formValue, onLogin, setErrorMessage, setInfo) {
    if (!formValue.email || !formValue.password) {
      setErrorMessage('Заполните все поля формы');
      return;
    }
    const { email, password } = formValue;
    setIsLoading(true);
    mainApi
      .login({ email, password })
      .then(data => {
        setTimeout(() => {
          setInfo(data.message);
        }, 0);
        onLogin(true);
        setIsLoggedIn(true);
        setTimeout(() => navigate('/movies', { replace: true }), 3000);
      })
      .catch(err => {
        err.then(data => {
          setErrorMessage(data.message);
        });
      })
      .finally(() => {
        setInfo(null);
        setErrorMessage(null);
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
          setIsLoggedIn(false);
          setCurrentUser('');
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        }
      })
      .catch(err => {
        err.then(data => {
          //ошибки с сервера -
          setErrors(data.message);
        });
      })
      .finally(() => {
        setErrors(null);
        setInfoMessage(null);
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
          err.then(data => {
            //ошибки с сервера -
            setErrors(data.message);
          });
        })
        .finally(setErrors(null));
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
        err.then(data => {
          setErrors(data.message);
          setErr(data.validation ? data.validation.body.message : '');
        });
      })
      .finally(() => {
        setErrors(null);
        setErr(null);
        setIsLoading(false);
        setTimeout(() => {
          setInfo(null);
        }, 1000);
      });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        isLoggedIn: isLoggedIn,
        currentMovieList: savedMovieList
      }}
    >
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/"></Navigate>
              ) : (
                <Register onRegister={handleRegister} isLoading={isLoading} />
              )
            }
          />

          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/"></Navigate>
              ) : (
                <Login
                  onLogin={setIsLoggedIn}
                  handleLogin={handleLogin}
                  isLoading={isLoading}
                  set
                />
              )
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                movies={movies}
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                handleSearchQuery={handleSearchQuery}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                movieIsNotFound={movieIsNotFound}
                setMovies={setMovies}
                onMovieClick={handleSaveMovie}
                onMovieDelete={handleMovieDelete}
                isSaved={isSaved}
                loadMore={loadMore}
                currentMoviePage={currentMoviePage}
                readLess={readLess}
                savedMovies={savedMovieList}
                setMovieIsNotFound={setMovieIsNotFound}
                errors={errors}
                setErrors={setErrors}
                infoMessage={infoMessage}
                movieQuery={movieQuery}
              ></ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                movies={savedMovieList}
                allMovies={movies}
                savedQuery={savedSearchQuery}
                setSavedSearchQuery={setSavedSearchQuery}
                onSaveMovie={handleSaveMovie}
                onMovieDelete={handleMovieDelete}
                handleSaveSearch={handleSaveSearch}
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                setSavedMovieList={setSavedMovieList}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                movieIsNotFound={movieIsNotFound}
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
                element={Profile}
                onLogout={signOut}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
                errors={errors}
              ></ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigation to="/signup" replace />} />

          <Route path="/movies" element={<Navigation to="/signin" replace />} />

          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
