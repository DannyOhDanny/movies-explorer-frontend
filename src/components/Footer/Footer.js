import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__columns">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__links">
          <li>
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
