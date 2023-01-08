import React from "react";
import './Profile.css';

export default function Profile(){
    const name = 'Elena';
    const email = 'elena@mail.ru';

    return(
        <section className="profile">
            <h2 className="profile__title">Привет, {name}!</h2>
            <form className="profile__form">
                <div className="profile__form-container">
                    <div className="profile__input-container">
                        <label 
                            for="name" 
                            className="profile__label">
                            Имя
                        </label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            className="profile__input profile__input_type_name"
                            required
                            placeholder="Имя"
                            minLength="2"
                            maxLength="40"
                            value={name}
                        />
                    </div>

                    <div className="profile__input-container">
                        <label 
                            for="email" 
                            className="profile__label">
                            E-mail
                        </label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="profile__input profile__input_type_email"
                            required
                            placeholder="email"
                            minLength="2"
                            maxLength="40"
                            value={email}
                        />
                    </div>
                </div>

                <button className="profile__btn profile__btn_type_edit">Редактировать</button>
                <button className="profile__btn profile__btn_type_signout">Выйти из аккаунта</button>
            </form>
        </section>
    )
}