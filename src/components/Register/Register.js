import React from "react";
import "./Register.css";
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function Register(){
    const [values, setValues] = React.useState({name:"", email:"", password:""});

    function handleChange(e) {
        const {name, value} = e.target;
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    return(
        <section className="register">
            <Form
             title="Добро пожаловать!"
                submitButton="Зарегестрироваться"
                questionMessage="Уже зарегистрированы?"
                optionButton="Войти"
            >
                <Input
                    name="name"
                    id="name"
                    type="text"
                    value={values.name}
                    label="Имя"
                    errorMessage="Имя должно содержать от 2 до 30 символов"
                    onChange={handleChange}
                />
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
            </Form>
        </section>
    )
}