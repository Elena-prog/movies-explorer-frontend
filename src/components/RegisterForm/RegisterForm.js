import React from "react";
import { useNavigate } from "react-router-dom";
import './RegisterForm.css';

export default function RegisterForm({ title, children, submitButton, questionMessage, optionButton, onSubmit, formValid, link, registerErrorMessage }){
    const navigate =useNavigate()
    function handleClik () {
        navigate(link);
    }   
    return(
        <form action="#" className="form" onSubmit={onSubmit}>
            <h3 className="form__title">{title}</h3>
            <ul className="form__input-container">
                {children}
            </ul>
            <div className="form__button-container">
                <span className="form__error">{registerErrorMessage}</span>
                <button disabled = {!formValid} type="submit" className="form__submit-button">{submitButton}</button>
                <div className="form__option">
                    <span className="form__question">{questionMessage}</span>
                    <button onClick={handleClik} type="button" className="form__option-button">{optionButton}</button>
                </div>
            </div>
        </form>
    )
}