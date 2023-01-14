import React from "react";
import Account from "../Account/Account";
import Navigation from "../Navigation/Navigation";
import './BurgerMenu.css';

export default function BurgerMenu({ isOpen, onClose }){
    return(
        <section className={`burger-menu ${isOpen && 'burger-menu_opened'}`}>
            <button type="button" className={"burger-menu__close-button"} aria-label="кнопка закрыть." onClick={onClose}></button>
            <Navigation/>
            <Account/>
        </section>
    )
}