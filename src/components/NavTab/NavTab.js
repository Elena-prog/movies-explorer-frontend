import React from "react";
import "./NavTab.css";

export default function NavTab () {
    return(
        <nav className="nav-tab">
            <a href="#about"  className="nav-tab__link">О проекте</a>
            <a href="#tech" className="nav-tab__link">Технологии</a>
            <a href="#profile" className="nav-tab__link">Студент</a>
        </nav>
    )
}
