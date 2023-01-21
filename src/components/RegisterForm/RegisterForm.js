import React from "react";
import './RegisterForm.css';

export default function RegisterForm({ title, children, submitButton, questionMessage, optionButton }){
    return(
        <form action="#" className="form">
            <h3 className="form__title">{title}</h3>
            <ul className="form__input-container">
                {children}
            </ul>
            <div className="form__button-container">
                <button type="submit" className="form__submit-button">{submitButton}</button>
                <div className="form__option">
                    <span className="form__question">{questionMessage}</span>
                    <button type="button" className="form__option-button">{optionButton}</button>
                </div>
            </div>
        </form>
    )
}