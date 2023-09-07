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
          <article className="about-me__paragraph">
            Несколько последних лет я работала в департаменте маркетинга компании по производству
            радиооборудования в формате проектной деятельности в должности бренд-менеджера, а затем
            продакт маркетинг менеджера. В 2022 году решила сменить род деятельности на профессию
            front-end разработчика.
            <p>
              В первую очередь, у меня есть позитивный опыт работы в команде c разработчиками и
              аутсорсинговыми компаниями над совместными и смежными проектами в IT.
            </p>
            <p>
              Также, я достаточно давно интересуюсь этой профессией и развивалась в смежных областях
              (были базовые знания html, опыт работы с хостингом, доменами, и VPS, разработка ТЗ для
              нескольких сайтов и их проддержка), поэтому мне всегда казалось, что мои знания могут
              превратиться в полноценную профессию и помочь мне в изучении новых технологий.
            </p>
            <p>
              На данный момент я нацелена на усиленное развитие моих профессиональных компетенций и
              навыков в веб-разработке, а также на получение бесценного опыта участия в реальных
              проектах.
            </p>
          </article>
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
