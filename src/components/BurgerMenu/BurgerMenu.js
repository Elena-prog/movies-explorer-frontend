import React from "react";
import Account from "../Account/Account";
import Navigation from "../Navigation/Navigation";
import './BurgerMenu.css';

export default function BurgerMenu({ isOpen, onClose }){    
    const handleClick = (evt) => {
        evt.target.classList.contains('burger-menu') && onClose();
    }

    return(
        <section onClick={handleClick} className={`burger-menu ${isOpen? 'burger-menu_opened': ''}`}>
            <div className="burger-menu__container">
                <button type="button" className={"burger-menu__close-button"} aria-label="кнопка закрыть." onClick={onClose}></button>
                <Navigation/>
                <Account/>
            </div>
        </section>
    )
}