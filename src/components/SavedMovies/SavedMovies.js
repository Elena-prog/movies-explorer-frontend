import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies({ movies }){

    return(
        <section className="saved-movies">
            <SearchForm/>
            <FilterCheckbox/>
            <MoviesCardList movies={movies} type="saved-movies"/>
        </section>
    )
}