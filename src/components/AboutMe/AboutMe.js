import React from "react";
import { Link } from 'react-router-dom';
import './AboutMe.css'
import SectionTitle from "../SectionTitle/SectionTitle";
import student from '../../images/student.jpg';
import Github from "../Github/Github";

export default function AboutMe(){
    return(
        <section className="about-me" id='profile'>
            <SectionTitle title='Студент'/>
            <div className='about-me__container'>
                <div className="about-me__info">
                    <h3 className="about-me__title">Елена</h3>
                    <p className="about-me__subtitle">Студент Яндекс Практикум</p>
                    <p  className="about-me__paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <Github/>
                </div>
                <img src={student} className="about-me__photo" alt="Фото."/>
            </div>
        </section>
    )
}