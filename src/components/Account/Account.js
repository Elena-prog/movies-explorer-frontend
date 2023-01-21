import React from "react";
import { NavLink } from 'react-router-dom';
import './Account.css';

export default function Account(){
    return(
        <NavLink to="/profile" className={({isActive}) => `account ${isActive? 'account_active':'' }`}>
            <p className="account__link">Аккаунт</p>
            <div className="account__logo"></div>
        </NavLink>
    )
}