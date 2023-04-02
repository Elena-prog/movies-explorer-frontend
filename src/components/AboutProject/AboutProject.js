import React from "react";
import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector } from "react-redux";

export default function AboutProject() {
    const theme = useSelector(state=>state.theme.value);
    return(
        <section className="about-project" id="about">
            <SectionTitle title="О проекте"/>
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
            <div className="about-project__diagram-container">
                <div className="about-project__diagram about-project__diagram_type_backend">1 неделя</div>
                <div className={`about-project__diagram about-project__diagram_type_frontend about-project__diagram_theme_${theme}`}>4 недели</div>
                <p className="about-project__caption">Back-end</p>
                <p className="about-project__caption">Front-end</p>
            </div>
        </section>
    )
}