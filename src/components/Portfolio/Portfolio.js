import './Portfolio.css';
import React from 'react';
import arrow from '../../images/text__COLOR_font-main.svg';
function Portfolio(props) {
  return (
    <section id="portfolio" className="portfolio">
      <h2 className="portfolio__title"> Портфолио</h2>
      <ul className="portfolio__box-wrapper">
        <li className="portfolio__box">
          <a
            className="portfolio__link"
            href="https://github.com/DannyOhDanny/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <img className="portfolio__arrow" src={arrow} alt="arrow"></img>
          </a>
        </li>
        <li className="portfolio__box">
          <a
            className="portfolio__link"
            href="https://github.com/DannyOhDanny/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <img className="portfolio__arrow" src={arrow} alt="arrow"></img>
          </a>
        </li>
        <li className="portfolio__box">
          <a
            className="portfolio__link"
            href="https://github.com/DannyOhDanny/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <img className="portfolio__arrow" src={arrow} alt="arrow"></img>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
