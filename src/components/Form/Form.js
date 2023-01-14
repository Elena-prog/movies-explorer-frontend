import React from "react";
import './Form.css';

export default function Form({title, children, submit, questionMessage, formButton, formType }){
    return(
        <form action="#" className={`form form_type_${formType}`}>
            <h3 className={`form__title form__title_type_${formType}`}>{title}</h3>
            <div className={`form__input-container form__input-container_type_${formType}`}>
                {children}
            </div>
            <div className={`form__button-container form__button-container_type_${formType}`}>
                <button type="submit" className={`form__submit-button form__submit-button_type_${formType}`}>{submit}</button>
                <div className={`form__option form__option_type_${formType}`}>
                    <span className={`form__question type_${formType}`}>{questionMessage}</span>
                    <button className={`form__option-button form__option-button_type_${formType}`}>{formButton}</button>
                </div>
            </div>
        </form>
    )
}