import React from "react";
import { useSelector } from "react-redux";
import Account from "../Account/Account";
import Navigation from "../Navigation/Navigation";
import './BurgerMenu.css';

export default function BurgerMenu({ isOpen, onClose }){   
    const theme = useSelector(state=>state.theme.value) 
    const handleClick = (evt) => {
        evt.target.classList.contains('burger-menu') && onClose();
    }

    return(
        <section onClick={handleClick} className={`burger-menu ${isOpen? 'burger-menu_opened': ''}`}>
            <div className={`burger-menu__container burger-menu__container_theme_${theme}`}>
                <button type="button" className={`burger-menu__close-button burger-menu__close-button_theme_${theme}`} aria-label="кнопка закрыть." onClick={onClose}></button>
                <Navigation/>
                <Account/>
            </div>
        </section>
    )
}