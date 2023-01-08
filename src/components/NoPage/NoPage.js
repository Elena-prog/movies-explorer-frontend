import React from "react";
import './NoPage.css';

export default function NoPage(){
    return(
        <section className="nopage">
            <h1 className="nopage__title">404</h1>
            <p className="nopage__subtitle">Страница не найдена</p>
            <button className="nopage__back-button">Назад</button>
        </section>
    )
}