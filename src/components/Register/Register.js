import React from "react";
import './Register.css';
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function Register(){
    return(
        <Form
            title="Добро пожаловать!"
            submit="Зарегестрироваться"
            questionMessage="Уже зарегистрированы?"
            formButton="Войти"

        >
            <Input
                name="name"
                id="name"
                type="text"
                value="Elena"
                label="Имя"
                errorMessage="Невалидное имя"
            />
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