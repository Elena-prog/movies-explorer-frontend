import React from "react";
import { useSelector } from "react-redux";
import "./Footer.css";

export default function Footer() {
    const theme = useSelector(state=>state.theme.value)
    return(
        <footer className={`footer footer_theme_${theme}`}>
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy;2023</p>
                <ul className="footer__links"> 
                    <li><a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a></li>
                    <li><a href="https://github.com/Elena-prog" target="_blank" rel="noreferrer" className="footer__link">Github</a></li>
                </ul>
            </div>
        </footer>
    )
}