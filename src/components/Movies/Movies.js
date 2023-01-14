import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function Movies({ movies }){

    return(
        <div className="movies">
            <SearchForm/>
            <div className="movies__container">
                <FilterCheckbox/>
            </div>
            <MoviesCardList movies={movies}/>
        </div>
    )
}