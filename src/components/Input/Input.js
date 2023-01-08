import React from "react";
import './Input.css';

export default function Input({ label, name, id, type, value, errorMessage }){
    return(
        <section className="input">
            <label htmlFor={id} className="input__label">{label}</label>
            <input
                name={name}
                id={id}
                type={type}
                className="input__field"
                value={value}
            />
            <span className="input__error">{errorMessage}</span>
        </section>
    )
}