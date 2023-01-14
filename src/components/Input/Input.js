import React from "react";
import './Input.css';

export default function Input({ label, name, id, type, value, errorMessage, inputType, onChange, placeholder }){
    return(
        <section className={`input input_type_${inputType}`}>
            <label 
                htmlFor={id} 
                className={`input__label input__label_type_${inputType}`}>
                {label}
            </label>
            <input
                name={name}
                id={id}
                type={type}
                className={`input__field input__field_type_${inputType}`}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            <span 
                className={`input__error input__error_type_${inputType}`}>
                {errorMessage}
            </span>
        </section>
    )
}