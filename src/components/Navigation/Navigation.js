import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css'

export default function Navigation() {
    return(
        <nav className="navigation">
            <NavLink to='/' className={({isActive}) => `navigation__link navigation__link_type_main ${isActive? 'navigation__link_active':'' }`}>
                Главная
            </NavLink>
            <NavLink to='/movies' className={({isActive}) => `navigation__link ${isActive? 'navigation__link_active':'' }`}>
                Фильмы
            </NavLink>
            <NavLink to = '/saved-movies' className={({isActive}) => `navigation__link ${isActive? 'navigation__link_active':'' }`}>
                Сохраненные фильмы
            </NavLink>
        </nav>
    )
}