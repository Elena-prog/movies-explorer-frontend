import React from "react";
import "./BurgerButton.css";

export default function BurgerButton({ handleClick }){
    return(
        <button type="button" className="burger-button" onClick={handleClick}></button>
    )
}