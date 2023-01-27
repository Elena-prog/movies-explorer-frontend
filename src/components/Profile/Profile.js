import React from "react";
import './Profile.css';

export default function Profile({onLogout}){
    const [values, setValues] = React.useState({name:"", email:""});

    function handleChange(e) {
        const {name, value} = e.target;
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    return(
        <section className="profile">
            <form className="profile__form">
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
                            className="profile__error">
                            Имя должно содержать от 2 до 30 символов
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
                            className="profile__error">
                            Невалидный email
                        </span>
                    </li>
                </ul>
                <div className="profile__button-container">
                    <button type="submit" className="profile__submit-button">Редактировать</button>
                    <button onClick={onLogout} type="button" className="profile__option-button">Выйти из аккаунта</button>
                </div>
            </form>
        </section>
    )
}