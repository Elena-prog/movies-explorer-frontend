import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function Movies({ movies, loadMore }){

    return(
        <section className="movies">
            <SearchForm/>
            <FilterCheckbox/>
            <MoviesCardList movies={movies} loadMore={loadMore} type="movies"/>
        </section>
    )
}