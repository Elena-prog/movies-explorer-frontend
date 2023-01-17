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
        <section className="login">
            <Form
                title="Рады видеть!"
                submitButton="Войти"
                questionMessage="Ещё не зарегистрированы?"
                optionButton="Регистрация"

            >
                <Input
                    name="email"
                    id="email"
                    type="email"
                    value="elena@mail.ru"
                    label="E-mail"
                    errorMessage="Невалидный email"
                    onChange={handleChange}
                /> 
                <Input
                    name="password"
                    id="password"
                    type="password"
                    value="123456"
                    label="password"
                    errorMessage="Неверный пароль"
                    onChange={handleChange}
                /> 
            </Form>
        </section>
    )
}