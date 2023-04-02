import React from "react";
import { useSelector } from "react-redux";
import "./Portfolio.css";

export default function Portfolio(){
    const theme = useSelector(state=>state.theme.value)
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__items">
                <li className="portfolio__item">
                    <a href="https://github.com/Elena-prog/how-to-learn" rel="noreferrer" target="_blank" className="portfolio__link">
                        <p className="portfolio__link-title">Статичный сайт</p>
                        <div className={`portfolio__link-image portfolio__link-image_theme_${theme}`}></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://elena-prog.github.io/russian-travel-project/" rel="noreferrer" target="_blank" className="portfolio__link">
                        <p className="portfolio__link-title">Адаптивный сайт</p>
                        <div className={`portfolio__link-image portfolio__link-image_theme_${theme}`}></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a href="https://mesto.russia.nomoredomains.club/" target="_blank" rel="noreferrer" className="portfolio__link">
                        <p className="portfolio__link-title">Одностраничное приложение</p>
                        <div className={`portfolio__link-image portfolio__link-image_theme_${theme}`}></div>
                    </a>
                </li>
            </ul>
        </section>
    )
}