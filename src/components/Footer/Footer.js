import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';
import Github from "../Github/Github";

export default function Footer({ props }) {
    return(
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copywright">&copy;2022</p>
                <div className="foo">
                    <Link to='/' className="footer__link">Яндекс.Практикум</Link>
                    <Github/>
                </div>
            </div>
        </footer>
    )
}