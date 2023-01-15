import React from "react";
import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import Github from "../Github/Github";
import student from "../../images/student.jpg";

export default function AboutMe(){
    return(
        <section className="about-me" id="profile">
            <SectionTitle title="Студент"/>
            <div className="about-me__container">
                <div className="about-me__info">
                    <h3 className="about-me__title">Елена</h3>
                    <p className="about-me__paragraph about-me__paragraph_type_subtitle">Студент Яндекс Практикум</p>
                    <p  className="about-me__paragraph about-me__paragraph_type_description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a href="https://github.com/Elena-prog" target="_blank" rel="noreferrer" className="about-me__link">Github</a>
                </div>
                <img src={student} className="about-me__photo" alt="Фото студента."/>
            </div>
        </section>
    )
}