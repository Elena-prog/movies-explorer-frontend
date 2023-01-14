import React from "react";
import './Login.css';
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function Login(){
    const [values, setValues] = React.useState({email:"", password:""});

    function handleChange(e) {
        const {name, value} = e.target;
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    return(
        <Form
            title="Рады видеть!"
            submit="Войти"
            questionMessage="Ещё не зарегистрированы?"
            formButton="Регистрация"
            formType="register"

        >
            <Input
                name="email"
                id="email"
                type="email"
                value="elena@mail.ru"
                label="E-mail"
                inputType="register"
                errorMessage="Невалидный email"
                onChange={handleChange}
            /> 
            <Input
                name="password"
                id="password"
                type="password"
                value="123456"
                label="password"
                inputType="register"
                errorMessage="Неверный пароль"
                onChange={handleChange}
            /> 
        </Form>
    )
}