import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Theme from "../Theme/Theme";
import './Navigation.css'

export default function Navigation() {
    const theme = useSelector(state=>state.theme.value);
    const getClassName = (isActive) => {
        if(isActive && theme === 'dark'){
            return 'navigation__link_active_dark '
        }
        if(isActive && theme === 'light'){
            return 'navigation__link_active_light '
        }
        return ''
    }

    return(
        <nav className="navigation">
            <NavLink to="/" className={({isActive}) => `navigation__link navigation__link_type_main ${getClassName(isActive)}`}>
                Главная
            </NavLink>
            <NavLink to="/movies" className={({isActive}) => `navigation__link ${getClassName(isActive)}`}>
                Фильмы
            </NavLink>
            <NavLink to = "/saved-movies" className={({isActive}) => `navigation__link ${getClassName(isActive)}`}>
                Сохраненные фильмы
            </NavLink>
            <div className="navigation__theme">
                <Theme>
                    <span className="navigation__theme-message">{`Включить ${theme==='dark'? 'светлую':'темную'} тему`}</span>
                </Theme>
            </div>
        </nav>
    )
}