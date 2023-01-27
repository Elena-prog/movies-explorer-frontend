import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function Movies({ movies, loadMore, foundMovies, searchMovies, isFiltering, handleChangeCheckbox, isLoading, notFoundMovie }){

    return(
        <section className="movies">
            <SearchForm searchMovies={searchMovies}/>
            <FilterCheckbox isFiltering={isFiltering} handleChangeCheckbox={handleChangeCheckbox}/>
            <MoviesCardList movies={movies} loadMore={loadMore} foundMovies={foundMovies} isLoading={isLoading} notFoundMovie={notFoundMovie} type="movies"/>
        </section>
    )
}