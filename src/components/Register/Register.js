import React from "react";
import './Register.css';
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
        <Form
            title="Добро пожаловать!"
            submit="Зарегестрироваться"
            questionMessage="Уже зарегистрированы?"
            formButton="Войти"
            formType="register"

        >
            <Input
                name="name"
                id="name"
                type="text"
                value={values.name}
                label="Имя"
                inputType="register"
                errorMessage="Имя должно содержать от 2 до 30 символов"
                onChange={handleChange}
            />
            <Input
                name="email"
                id="email"
                type="email"
                value={values.email}
                label="E-mail"
                inputType="register"
                errorMessage="Невалидный email"
                onChange={handleChange}
            /> 
            <Input
                name="password"
                id="password"
                type="password"
                value={values.password}
                label="password"
                inputType="register"
                errorMessage="Неверный пароль"
                onChange={handleChange}
            /> 
        </Form>
    )
}