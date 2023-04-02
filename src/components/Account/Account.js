import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './Account.css';

export default function Account(){
    const theme = useSelector(state=>state.theme.value)
    return(
        <NavLink to="/profile" className={({isActive}) => `account ${isActive? 'account_active':'' }`}>
            <p className="account__link">Аккаунт</p>
            <div className={`account__logo account__logo_theme_${theme}`}></div>
        </NavLink>
    )
}