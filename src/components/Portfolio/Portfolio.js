import React from "react";
import './Portfolio.css'

export default function Portfolio(){
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__items">
                <li className="portfolio__item">
                    <p className="portfolio__link-title">Статичный сайт</p>
                    <button className="portfolio__link-btn"></button>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__link-title">Адаптивный сайт</p>
                    <button className="portfolio__link-btn"></button>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__link-title">Одностраничное приложение</p>
                    <button className="portfolio__link-btn"></button>
                </li>
            </ul>
        </section>
    )
}