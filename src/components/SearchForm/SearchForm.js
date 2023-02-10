import React from "react";
import './SearchForm.css';
import { SEARCH_ERROR } from "../../constants"

export default function SearchForm({ handleSearchMovies, search, setSearch, type }){
    const [errorMessage, setErrorMessage] = React.useState('');
    const searchString = React.useRef('');

    function handleChange(e) {
        if(type === "movies"){
            setSearch(e.target.value);
        }
        setErrorMessage('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(search !== ''){
            if(type === "movies"){
                handleSearchMovies(search);
            } else if (type === "saved-movies") {
                handleSearchMovies(searchString.current.value)
            }
            handleSearchMovies(search);
            setErrorMessage('');
        } else {
            setErrorMessage(SEARCH_ERROR);
        }
    }

    return(
        <div action="#" className="search-form">
            <form 
                action="#" 
                className="search-form__container"
                onSubmit={handleSubmit}
                noValidate
                >
                <input 
                name="film" 
                type="text" 
                className="search-form__input" 
                required 
                placeholder="Фильм"
                value={search}
                onChange={handleChange}
                ref = {searchString}
                />
                <button type="submit" className="search-form__btn">Поиск</button>
            </form>
            <span className={`search-form__error`}>{errorMessage}</span>
        </div>

    )
}