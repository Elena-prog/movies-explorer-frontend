import React from "react";
import './SearchForm.css';

export default function SearchForm({ handleSearchMovies, search, setSearch }){
    const [errorMessage, setErrorMessage] = React.useState('');

    function handleChange(e) {
        setSearch(e.target.value);
        setErrorMessage('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(search !== ''){
            handleSearchMovies(search);
            setErrorMessage('');
        } else {
            setErrorMessage('Нужно ввести ключевое слово');
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
                />
                <button type="submit" className="search-form__btn">Поиск</button>
            </form>
            <span className={`search-form__error`}>{errorMessage}</span>
        </div>

    )
}