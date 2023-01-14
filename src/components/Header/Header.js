import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import RegisterButton from '../RegisterButton/RegisterButton';
import LoginButton from '../LoginButton/LoginButton';
import BurgerButton from '../BurgerButton/BurgerButton';

export default function Header ({ openPopup }) {
    const loggedIn = true;

    return (
        <Routes>
            <Route path='/' element={
                loggedIn?  
                <header className='header header_theme_blue'>
                    <div className='header__container header__container_position_left'><Logo/></div>
                    <div className='header__container header__container_position_center'><Navigation/></div>
                    <div className='header__container header__container_position_right'><Account/></div>
                    <BurgerButton handleClick={openPopup}/>
                </header>                    
                :
                <header className='header header_theme_blue'>
                    <div className='header__container header__container_position_left'><Logo/></div>
                    <div className='header__container header__container_position_right'>
                        <RegisterButton/>
                        <LoginButton handleClick={openPopup}/>
                    </div>
                </header>
                }
            />
            <Route path='/*' element={
                <header className='header header_theme_dark'>
                    <div className='header__container header__container_position_left'><Logo/></div>
                    <div className='header__container header__container_position_center'><Navigation/></div>
                    <div className='header__container header__container_position_right'><Account/></div>
                    <BurgerButton handleClick={openPopup}/>
                </header>
            }/>
            <Route path='/signup' element = {
                <header className='header header_theme_dark header_type_register'>
                    <Logo/>
                </header>
            }/>
            <Route path='/signin' element = {
                <header className='header header_theme_dark header_type_register'>
                    <Logo/>
                </header>
            }/>
        </Routes>
    );
}