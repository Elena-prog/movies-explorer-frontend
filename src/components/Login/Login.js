import React from "react";
import './Login.css';
import RegisterForm from "../RegisterForm/RegisterForm";
import Input from "../Input/Input";

export default function Login({onLogin, registerErrorMessage}){
    const [values, setValues] = React.useState({email:"", password:""});
    const [emailValid, setEmailValid] = React.useState(false);
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [formValid, setFormValid] = React.useState(false);
    const [readOnly, setReadOnly] = React.useState(false);

    function validateField(fieldName, value){
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
        setFormValid(emailValid && passwordValid);
    }, [emailValid, passwordValid])


    function handleChange(e) {
        const {name, value} = e.target;
        validateField(name, value)
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e){
        setReadOnly(true);
        e.preventDefault();
        onLogin(values.email, values.password)
        .finally(()=> setReadOnly(false))
    }

    return(
        <section className="login">
            <RegisterForm
                title="Рады видеть!"
                submitButton="Войти"
                questionMessage="Ещё не зарегистрированы?"
                optionButton="Регистрация"
                onSubmit={handleSubmit}
                formValid={formValid}
                link="/signup"
                registerErrorMessage={registerErrorMessage}

            >
                <Input
                    name="email"
                    id="email"
                    type="email"
                    value={values.email}
                    label="E-mail"
                    errorMessage={values.email ==="" ? "" :"Невалидный email"}
                    onChange={handleChange}
                    fieldValid = {emailValid}
                    readOnly = {readOnly}
                /> 
                <Input
                    name="password"
                    id="password"
                    type="password"
                    value={values.password}
                    label="password"
                    errorMessage={values.password ==="" ? "" :"Пароль должен содержать от 2 до 8 символов"}
                    onChange={handleChange}
                    fieldValid = {passwordValid}
                    readOnly = {readOnly}
                /> 
            </RegisterForm>
        </section>
    )
}