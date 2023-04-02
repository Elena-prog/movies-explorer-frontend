import React from "react";
import { useSelector } from "react-redux";
import "./Promo.css";

export default function Promo() {
    
    const theme = useSelector(state => state.theme.value)
    
    return(
        <section className={`promo promo_theme_${theme}`}>
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </section>

    )
}