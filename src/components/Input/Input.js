import React from "react";
import './Input.css';

export default function Input({ id, label, name, type, value,placeholder, onChange, errorMessage }){
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
            />
            <span 
                className="input__error">
                {errorMessage}
            </span>
        </li>
    )
}