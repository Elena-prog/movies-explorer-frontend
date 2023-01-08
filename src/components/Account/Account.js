import React from "react";
import { Link } from 'react-router-dom';
import './Account.css';

export default function Account(){
    return(
    <Link to='/profile' className="account">
        <p className="account__link">Аккаунт</p>
        <div className="account__logo"></div>
    </Link>
    )
}