import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";

export default function Movies({ movies, loadMore, foundMovies, searchMovies, isFiltering, handleChangeCheckbox, isLoading, notFoundMovie, saveMovie, search, setSearch, deleteMovie}){

    return(
        <section className="movies">
            <SearchForm searchMovies={searchMovies} search={search} setSearch={setSearch} />
            <FilterCheckbox isFiltering={isFiltering} handleChangeCheckbox={handleChangeCheckbox}/>
            {isLoading?
                <Preloader/>
                :
                <>
                    {movies.length !==0 ?
                        <MoviesCardList movies={movies} loadMore={loadMore} foundMovies={foundMovies} saveMovie={saveMovie} deleteMovie={deleteMovie} type="movies"/>
                        :
                    <span className="movies__error">{notFoundMovie}</span>
                    }
                </>
            }
        </section>
    )
}