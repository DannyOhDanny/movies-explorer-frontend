import './Techs.css';
import React from 'react';

function Techs() {
  return (
    <section id="techs" className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__subtitle-wrapper">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__paragraph">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <div className="techs__box-wrapper">
        <div className="techs__box">
          <p className="techs__text">HTML</p>
        </div>
        <div className="techs__box">
          <p className="techs__text">CSS</p>
        </div>
        <div className="techs__box">
          <p className="techs__text">JS</p>
        </div>
        <div className="techs__box">
          <p className="techs__text">React</p>
        </div>
        <div className="techs__box">
          <p className="techs__text">Git</p>
        </div>
        <div className="techs__box">
          <p className="techs__text">Express.js</p>
        </div>
        <div className="techs__box">
          <p className="techs__text">mongoDB</p>
        </div>
      </div>
    </section>
  );
}

export default Techs;
