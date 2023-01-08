import React from "react";
import './Login.css';
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function Login(){
    return(
        <Form
            title="Рады видеть!"
            submit="Войти"
            questionMessage="Ещё не зарегистрированы?"
            formButton="Регистрация"

        >
            <Input
                name="email"
                id="email"
                type="email"
                value="elena@mail.ru"
                label="E-mail"
                errorMessage="Невалидный email"
            /> 
            <Input
                name="password"
                id="password"
                type="password"
                value="123456"
                label="password"
                errorMessage="Неверный пароль"
            /> 
        </Form>
    )
}