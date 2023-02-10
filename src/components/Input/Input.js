import React from "react";
import './Input.css';

export default function Input({ 
    id, 
    label, 
    name, 
    type, 
    value,
    placeholder, 
    onChange, 
    errorMessage, 
    fieldValid,
    readOnly
}){
    return(
        <li className="input">
            <label 
                htmlFor={id} 
                className="input__label">
                {label}
            </label>
            <input
                name={name}
                id={id}
                type={type}
                className="input__field"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                readOnly={readOnly}
            />
            <span 
                className={`input__error ${fieldValid? '': 'input__error_visible'}`}>
                {errorMessage}
            </span>
        </li>
    )
}