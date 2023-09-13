import './AboutProject.css';
import React from 'react';

function AboutProject() {
  return (
    <section id="about" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text-wrapper">
        <div className="about-project__text-box">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div className="about-project__text-box">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>

      <div className="about-project__progress-cell-wrapper">
        <span className="about-project__progress-cell about-project__progress-cell_green">
          1 неделя
        </span>
        <span className="about-project__progress-cell about-project__progress-cell_gray">
          4 недели
        </span>
        <span className="about-project__progress-cell about-project__progress-cell_transparent">
          Backend
        </span>
        <span className=" about-project__progress-cell about-project__progress-cell_transparent">
          Front-end
        </span>
      </div>
    </section>
  );
}

export default AboutProject;
