import React from "react";
import { useNavigate } from 'react-router-dom';
import headerlogo from '../../images/logo.svg';
import './Logo.css';

export default function Logo({ }) {
    const navigate = useNavigate();

    function handleClick(path){
        navigate(path)
    }

    return(
        <img
            src = {headerlogo}
            alt = "Логотип проекта"
            className='logo'
            onClick={() => handleClick('/')}
        />
    )
};