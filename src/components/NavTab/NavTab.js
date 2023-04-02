import React from "react";
import { useSelector } from "react-redux";
import "./NavTab.css";

export default function NavTab () {
    const theme = useSelector(state=>state.theme.value)
    return(
        <nav className={`nav-tab nav-tab_theme_${theme}`}>
            <a href="#about"  className="nav-tab__link">О проекте</a>
            <a href="#tech" className="nav-tab__link">Технологии</a>
            <a href="#profile" className="nav-tab__link">Студент</a>
        </nav>
    )
}
