import React from "react";
import "./Register.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import Input from "../Input/Input";
import {INPUT_NAME_ERROR, INPUT_EMAIL_ERROR, INPUT_PASSWORD_ERROR} from "../../constants"

export default function Register({onRegister, registerErrorMessage}){
    const [values, setValues] = React.useState({name:"", email:"", password:""});
    const [nameValid, setNameValid] = React.useState(false);
    const [emailValid, setEmailValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [formValid, setFormValid] = React.useState(false);
    const [readOnly, setReadOnly] = React.useState(false);

    function validateField(fieldName, value){

        if(fieldName === 'name') {
            if(value.length < 2 || value.length > 30 || !value.match(/^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]+$/umi)) {
                setNameValid(false);
            } else  {
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
        setReadOnly(true);
        e.preventDefault();
        onRegister(values.email, values.password, values.name)
        .finally(()=> setReadOnly(false))
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
                    errorMessage={values.name ==="" ? "" : INPUT_NAME_ERROR}
                    onChange={handleChange}
                    required
                    fieldValid = {nameValid}
                    readOnly = {readOnly}
                />
                <Input
                    name="email"
                    id="email"
                    type="email"
                    value={values.email}
                    label="E-mail"
                    errorMessage={values.email ==="" ? "" : INPUT_EMAIL_ERROR}
                    onChange={handleChange}
                    required
                    fieldValid = {emailValid}
                    readOnly = {readOnly}
                /> 
                <Input
                    name="password"
                    id="password"
                    type="password"
                    value={values.password}
                    label="password"
                    errorMessage={values.password ==="" ? "" : INPUT_PASSWORD_ERROR}
                    onChange={handleChange}
                    required
                    fieldValid = {passwordValid}
                    readOnly = {readOnly}
                /> 
            </RegisterForm>
        </section>
    )
}