import React from "react";
import './Form.css';
import LoginButton from "../LoginButton/LoginButton";

export default function Form({title, children, submit, questionMessage, formButton }){
    return(
        <section className="form">
            <h2 className="form__title">{title}</h2>
            <form action="#" className="form__container">
                <div className="form__input-container">
                    {children}
                </div>
                <button type="submit" className="form__submit-button">{submit}</button>
                <div className="form__option">
                    <p className="form__question">{questionMessage}</p>
                    <button className="form__button">{formButton}</button>
                </div>
            </form>
        </section>
    )
}