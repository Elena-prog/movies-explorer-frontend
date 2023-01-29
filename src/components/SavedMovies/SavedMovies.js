import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies({ movies, deleteMovie }){

    return(
        <section className="saved-movies">
            <SearchForm/>
            <FilterCheckbox/>
            {movies? <MoviesCardList movies={movies} deleteMovie={deleteMovie} type="saved-movies"/>: ''}
            
        </section>
    )
}