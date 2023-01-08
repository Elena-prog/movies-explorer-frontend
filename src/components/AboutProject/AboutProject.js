import React from "react";
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function AboutProject() {

    return(
        <section className="about-project" id='about'>
            <SectionTitle title='О проекте'/>
            <div className="about-project__container">
                <ul className="about-project__items">
                    <li><h4 className="about-project__header-item">Дипломный проект включал 5 этапов</h4></li>
                    <li><p className="about-project__paragraph-item">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p></li>
                </ul>
                <ul className="about-project__items">
                    <li><h4 className="about-project__header-item">На выполнение диплома ушло 5 недель</h4></li>
                    <li><p className="about-project__paragraph-item">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p></li>
                </ul>
            </div>
            <div className="about-project__diagram">
                <div className="about-project__diagram_type_backend"><p>1 неделя</p></div>
                <div className="about-project__diagram_type_frontend"><p>4 недели</p></div>
                <p className="about-project__caption">Back-end</p>
                <p className="about-project__caption">Front-end</p>
            </div>
        </section>
    )
}