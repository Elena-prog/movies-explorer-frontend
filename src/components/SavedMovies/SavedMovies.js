import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies({ movies }){

    return(
        <div className="saved-movies">
            <SearchForm/>
            <div className="saved-movies__container">
                <FilterCheckbox/>
            </div>
            <MoviesCardList movies={movies}/>
        </div>
    )
}