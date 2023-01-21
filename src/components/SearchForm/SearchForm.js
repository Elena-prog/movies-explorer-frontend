import React from "react";
import './SearchForm.css';

export default function SearchForm(){
    return(
        <div action="#" className="search-form">
            <form 
                action="#" 
                className="search-form__container">
                <input 
                name="film" 
                type="text" 
                className="search-form__input" 
                required 
                placeholder="Фильм"
                />
                <button type="submit" className="search-form__btn">Поиск</button>
            </form>
        </div>

    )
}