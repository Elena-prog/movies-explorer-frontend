import React from "react";
import './SearchForm.css';

export default function SearchForm({searchMovies, search, setSearch}){
    const [showError, setShowError] = React.useState(false);
    
    function handleChange(e) {
        setSearch(e.target.value);
        setShowError(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(search !== ''){
            searchMovies(search)
            setShowError(false);
        } else {
            setShowError(true);
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
            <span className={`search-form__error ${showError && 'search-form__error_visible'}`}>Нужно ввести ключевое слово</span>
        </div>

    )
}