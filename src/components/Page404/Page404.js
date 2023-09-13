import './Page404.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Page404() {
  const navigate = useNavigate();

  return (
    <section className="page-404">
      <h2 className="page-404__title">404</h2>
      <p className="page-404__subtitle">Страница не найдена</p>
      <button className="page-404__button" onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
}

export default Page404;
