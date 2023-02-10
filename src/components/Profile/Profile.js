import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './Profile.css';
import {INPUT_NAME_ERROR, INPUT_EMAIL_ERROR, INPUT_PASSWORD_ERROR} from "../../constants"

export default function Profile({onLogout, onUpdateUser, registerErrorMessage}){
    const currentUser = React.useContext(CurrentUserContext);
    const [values, setValues] = React.useState({name: currentUser.name, email:currentUser.email});

    const [nameValid, setNameValid] = React.useState(true);
    const [emailValid, setEmailValid] = React.useState(true);
    const [formValid, setFormValid] = React.useState(false);
    const [isSameField, setIsSameField] = React.useState(true);
    
    function validateField(fieldName, value){
        if(fieldName === 'name') {
            if(value.length < 2 || value.length > 30 || !value.match(/^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]+$/umi)) {
                setNameValid(false);
            } else if(value === currentUser.name ) {
                setIsSameField(true);
            } else {
                setNameValid(true);
                setIsSameField(false);
            }   
        }
        if(fieldName === 'email') {
            if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                setEmailValid(false);
            } else if (value === currentUser.email) {
                setIsSameField(true);
            }
            else {
                setEmailValid(true);
                setIsSameField(false);
            }
        }
    }

    React.useEffect(()=>{
        setFormValid(nameValid && emailValid && !isSameField);
    }, [nameValid, emailValid, isSameField])

    function handleChange(e) {
        const {name, value} = e.target;
        validateField(name, value);
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSameField(false);
        onUpdateUser(values.name, values.email)
        .finally(() => {
            setIsSameField(true)
        })
    }

    return(
        <section className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <h3 className="profile__title">{`Привет, ${values.name}`}</h3>
                <ul className="profile__input-items">
                    <li className="profile__input-item">
                        <div className="profile__input-container">
                            <label
                                className="profile__label"
                                htmlFor="name">
                                Имя
                            </label>
                            <input
                                className="profile__input"
                                name="name"
                                id="name"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </div>
                        <span 
                            className={`profile__error ${nameValid? '': 'profile__error_visible'}`}>
                            {INPUT_NAME_ERROR}
                        </span>
                    </li>
                    <li className="profile__input-item">
                        <div className="profile__input-container">
                            <label
                                className="profile__label"
                                htmlFor="email">
                                E-mail
                            </label>
                            <input
                                className="profile__input"
                                name="email"
                                id="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </div>
                        <span 
                            className={`profile__error ${emailValid? '': 'profile__error_visible'}`}>
                            {INPUT_EMAIL_ERROR}
                        </span>
                    </li>
                </ul>
                <div className="profile__button-container">
                    <span className="profile__submit-error">{registerErrorMessage}</span>
                    <button disabled={!formValid || isSameField} type="submit" className="profile__submit-button">Редактировать</button>
                    <button onClick={onLogout} type="button" className="profile__option-button">Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}