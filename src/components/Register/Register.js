import React from "react";
import "./Register.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import Input from "../Input/Input";

export default function Register({onRegister, registerErrorMessage}){
    const [values, setValues] = React.useState({name:"", email:"", password:""});


    const [nameValid, setNameValid] = React.useState(true);
    const [emailValid, setEmailValid] = React.useState(true);
    const [passwordValid, setPasswordValid] = React.useState(true);
    const [formValid, setFormValid] = React.useState(true)


    function validateField(fieldName, value){
        if(fieldName === 'name') {
            if(value.length < 2 || value.length > 30 || !value.match(/^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]+$/umi)) {
                setNameValid(false);
            } else {
                setNameValid(true);
            }   
        }
        if(fieldName === 'email') {
            if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                setEmailValid(false);
            } else {
                setEmailValid(true);
            }
        }
        if(fieldName === 'password') {
            if(value.length < 2 || value.length > 8) {
                setPasswordValid(false);
            } else {
                setPasswordValid(true);
            }
        }
    }

    React.useEffect(()=>{
        setFormValid(nameValid && emailValid && passwordValid);
    }, [nameValid, emailValid, passwordValid])

    function handleChange(e) {
        const {name, value} = e.target;
        validateField(name, value);
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        onRegister(values.email, values.password, values.name);
    }

    return(
        <section className="register">
            <RegisterForm
                title="Добро пожаловать!"
                submitButton="Зарегестрироваться"
                questionMessage="Уже зарегистрированы?"
                optionButton="Войти"
                onSubmit={handleSubmit}
                formValid={formValid}
                link="/signin"
                registerErrorMessage={registerErrorMessage}
            >
                <Input
                    name="name"
                    id="name"
                    type="text"
                    value={values.name}
                    label="Имя"
                    errorMessage="Имя должно быть от 2 до 30 символов и содержать только латиницу, кириллицу, пробел или дефис"
                    onChange={handleChange}
                    required
                    fieldValid = {nameValid}
                />
                <Input
                    name="email"
                    id="email"
                    type="email"
                    value={values.email}
                    label="E-mail"
                    errorMessage="Невалидный email"
                    onChange={handleChange}
                    required
                    fieldValid = {emailValid}
                /> 
                <Input
                    name="password"
                    id="password"
                    type="password"
                    value={values.password}
                    label="password"
                    errorMessage="Пароль должен содержать от 2 до 8 символов"
                    onChange={handleChange}
                    required
                    fieldValid = {passwordValid}
                /> 
            </RegisterForm>
        </section>
    )
}