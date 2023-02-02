import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies({ 
    movies, 
    deleteMovie, 
    isFiltering, 
    handleChangeCheckbox, 
    searchSavedMovies,
    savedMovies
}){

    const [search, setSearch] = React.useState('');

    function handleSearchMovies(search) {
        searchSavedMovies(search);
        setSearch(search)
    }

    return(
        <section className="saved-movies">
            <SearchForm 
                handleSearchMovies={handleSearchMovies} 
                search={search} 
                setSearch={setSearch}
                />
            <FilterCheckbox 
                isFiltering = {isFiltering} 
                handleChangeCheckbox={handleChangeCheckbox}
            />
            {movies?
            <MoviesCardList 
                movies={movies} 
                deleteMovie={deleteMovie} 
                type="saved-movies" 
                isFiltering = {isFiltering}
                savedMovies={savedMovies}/>
            : 
            ''}
            
        </section>
    )
}