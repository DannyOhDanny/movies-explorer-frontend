import './AboutMe.css';
import React from 'react';
import photo from '../../images/about-me__photo_optimized.jpg';

function AboutMe() {
  return (
    <section id="student" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__box-wrapper">
        <div className="about-me__text-wrapper">
          <h3 className="about-me__subtitle">Дарья Матвеева</h3>
          <p className="about-me__summary">Фронт-энд разработчик, 35 лет.</p>
          <p className="about-me__paragraph">
            Я из города Москвы, закончила факультет инстранных языков МГПУ, а также факультет
            проф-переподготовки РЭУ им. Плеханова по программе "Корпоративные финансы". Имею опыт
            работы в сфере образования, банковского дела и коммерческой деятельности. На данный
            момент являюсь студентом Яндекс.Практикум факультета веб-разработки.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/DannyOhDanny"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={photo} alt="Фото" title="Фото" />
      </div>
    </section>
  );
}

export default AboutMe;
