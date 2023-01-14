import React from "react";
import { Link } from 'react-router-dom';
import './Account.css';

export default function Account(){
    return(
        <div className="account">
            <Link to='/profile' className="account__container">
                <p className="account__link">Аккаунт</p>
                <div className="account__logo"></div>
            </Link>
        </div>
    )
}