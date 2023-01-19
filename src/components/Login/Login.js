import React from "react";
import './Login.css';
import RegisterForm from "../RegisterForm/RegisterForm";
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
        <section className="login">
            <RegisterForm
                title="Рады видеть!"
                submitButton="Войти"
                questionMessage="Ещё не зарегистрированы?"
                optionButton="Регистрация"

            >
                <Input
                    name="email"
                    id="email"
                    type="email"
                    value={values.email}
                    label="E-mail"
                    errorMessage="Невалидный email"
                    onChange={handleChange}
                /> 
                <Input
                    name="password"
                    id="password"
                    type="password"
                    value={values.password}
                    label="password"
                    errorMessage="Неверный пароль"
                    onChange={handleChange}
                /> 
            </RegisterForm>
        </section>
    )
}