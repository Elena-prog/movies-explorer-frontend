import React from "react";
import './Techs.css';
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector } from "react-redux";

export default function Tech(){
    const theme = useSelector(state=>state.theme.value);
    return(
        <section className={`tech tech_theme_${theme}`} id="tech">
            <SectionTitle title="Технологии"/>
            <div className="tech__container">
                <h3 className="tech__title">7 технологий</h3>
                <p className="tech__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="tech__items">
                    <li className={`tech__item tech__item_theme_${theme}`}>HTML</li>
                    <li className={`tech__item tech__item_theme_${theme}`}>CSS</li>
                    <li className={`tech__item tech__item_theme_${theme}`}>JS</li>
                    <li className={`tech__item tech__item_theme_${theme}`}>React</li>
                    <li className={`tech__item tech__item_theme_${theme}`}>Git</li>
                    <li className={`tech__item tech__item_theme_${theme}`}>Express.js</li>
                    <li className={`tech__item tech__item_theme_${theme}`}>mongoDB</li>
                </ul>
            </div>
        </section>
    )
}