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
            rel="noopener noreferrer"
          >
            Статичный сайт
          </a>
          <img className="portfolio__arrow" src={arrow} alt="arrow"></img>
        </li>
        <li className="portfolio__box">
          <a
            className="portfolio__link"
            href="https://github.com/DannyOhDanny/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
          </a>
          <img className="portfolio__arrow" src={arrow} alt="arrow"></img>
        </li>
        <li className="portfolio__box">
          <a
            className="portfolio__link"
            href="https://github.com/DannyOhDanny/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
          </a>
          <img className="portfolio__arrow" src={arrow} alt="arrow"></img>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
