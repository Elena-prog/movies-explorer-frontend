import React from "react";
import './Theme.css';
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../store/actionCreators/actionCreators";

const Theme = ({children}) => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.value)    

    const onThemeChangeCheckbox = () => {
        const newTheme = theme === 'light'? 'dark':'light';
        localStorage.setItem('theme', newTheme);
        dispatch(changeTheme(newTheme));
    }

    return (
        <section className="theme">
            <button onClick={onThemeChangeCheckbox} className='theme__button'>
                <div className={`theme__image theme__image_theme_${theme}`}></div>
                {children}
            </button>
        </section>
    )
}

export default Theme;