import React from "react";
import { useSelector } from "react-redux";
import "./BurgerButton.css";

export default function BurgerButton({ handleClick }){
    const theme = useSelector(state=>state.theme.value)
    return(
        <button type="button" className={`burger-button burger-button_theme_${theme}`} onClick={handleClick}></button>
    )
}