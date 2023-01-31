import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies({ movies, deleteMovie, isFiltering, handleChangeCheckbox }){

    return(
        <section className="saved-movies">
            <SearchForm/>
            <FilterCheckbox isFiltering = {isFiltering} handleChangeCheckbox={handleChangeCheckbox}/>
            {movies? <MoviesCardList movies={movies} deleteMovie={deleteMovie} type="saved-movies" isFiltering = {isFiltering}/>: ''}
            
        </section>
    )
}