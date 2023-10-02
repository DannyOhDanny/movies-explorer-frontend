import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Page404.css';

function Page404(props) {
  const navigate = useNavigate();

  // запоминаем последнюю локацию
  useEffect(() => {
    window.onbeforeunload = () => {
      if (props.isLoggedIn) {
        window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname));
      } else {
        navigate('/', { replace: true });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLoggedIn]);

  // Обработка клика с данными из sessionStorage
  const goBack = () => {
    if (props.isLoggedIn) {
      navigate(JSON.parse(window.sessionStorage.getItem('lastRoute')));
    } else {
      navigate('/', { replace: true });
    }
  };
  return (
    <section className="page-404">
      <h2 className="page-404__title">404</h2>
      <p className="page-404__subtitle">Страница не найдена</p>
      <button className="page-404__button" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default Page404;
