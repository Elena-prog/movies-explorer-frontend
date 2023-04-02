import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import BurgerButton from '../BurgerButton/BurgerButton';
import Theme from '../Theme/Theme';
import { useSelector } from 'react-redux';

export default function Header ({ openPopup, loggedIn }) {

    const theme = useSelector(state => state.theme.value);

    return (
        <Routes>
            <Route path="/" element={
                loggedIn?  
                <header className={`header header_theme_blue-${theme} header_page_authorized`}>
                    <Logo/>
                    <div className="header__container header__container_position_center"><Navigation/></div>
                    <div className="header__container header__container_position_right"><Account/><Theme/></div>
                    <BurgerButton handleClick={openPopup}/>  
                </header>                    
                :
                <header className={`header header_theme_blue-${theme} header_page_unauthorized`}>
                    <Logo/>
                    <div className="header__links">
                        <Link to="/signup" className={`header__link header__link_type_register header__link_theme_${theme}`}>Регистрация</Link>
                        <Link to="/signin" className="header__link header__link_type_login">Войти</Link>
                        <Theme/>
                    </div>
                </header>
                }
            />
            <Route path="/*" element={
                <header className={`header header_theme_${theme} header_page_authorized`}>
                    <Logo/>
                    <div className="header__container header__container_position_center"><Navigation/></div>
                    <div className="header__container header__container_position_right"><Account/><Theme/></div>
                    <BurgerButton handleClick={openPopup}/>
                </header>
            }/>
            <Route path="/signup" element = {
                <header className={`header header_theme_${theme} header_page_register`}>
                    <Logo/>
                </header>
            }/>
            <Route path="/signin" element = {
                <header className={`header header_theme_${theme} header_page_register`}>
                    <Logo/>
                </header>
            }/>
        </Routes>
    );
}