import React from "react";
import './Profile.css';
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function Profile(){
    const [values, setValues] = React.useState({name:"", email:""});

    function handleChange(e) {
        const {name, value} = e.target;
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    return(
        <section className="profile">
            <Form
                title= {`Привет, ${values.name}`}
                submit="Редактировать"
                formButton="Выйти из аккаунта"
                formType="profile"
            >
                <Input
                    name="name"
                    id="name"
                    type="text"
                    value={values.name}
                    label="Имя"
                    inputType="profile"
                    placeholder="Имя"
                    onChange={handleChange}
                    errorMessage="Имя должно содержать от 2 до 30 символов"
                />
                <Input
                    name="email"
                    id="email"
                    type="email"
                    value={values.email}
                    label="E-mail"
                    inputType="profile"
                    placeholder="E-mail"
                    onChange={handleChange}
                    errorMessage="Невалидный email"
                />
            </Form>
        </section>
    )
}