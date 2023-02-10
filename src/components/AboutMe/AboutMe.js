import React from "react";
import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import student from "../../images/student2.jpg";

export default function AboutMe(){
    return(
        <section className="about-me" id="profile">
            <SectionTitle title="Студент"/>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__title">Елена</h3>
                    <p className="about-me__paragraph about-me__paragraph_type_subtitle">Студент Яндекс Практикум</p>
                    <p  className="about-me__paragraph about-me__paragraph_type_description">Я живу в Новосибирске, закончила физико-технический факультет НГТУ. У меня есть две прекрасные дочки. Во время декретного отпуска решила сменить профессию, заинтересовалась фронтенд-разработкой. Мне нравится «оживлять» отрисованный дизайнерами интерфейс с помощью кода и воплощать функциональность. Недавно я закончила курс по веб-разработке от Яндекс Практикума и теперь готова к поиску новой работы.</p>
                    <a href="https://github.com/Elena-prog" target="_blank" rel="noreferrer" className="about-me__link">Github</a>
                </div>
                <img src={student} className="about-me__photo" alt="Фото студента."/>
            </div>
        </section>
    )
}