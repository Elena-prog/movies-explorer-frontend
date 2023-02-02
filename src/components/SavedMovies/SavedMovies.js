import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies({ 
    movies, 
    onCardDelete, 
    isFiltering, 
    onChangeCheckbox, 
    onSearchSavedMovies
}){

    const [search, setSearch] = React.useState('');

    function handleSearchMovies(search) {
        onSearchSavedMovies(search);
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
                onChangeCheckbox={onChangeCheckbox}
            />
            {movies?
            <MoviesCardList 
                movies={movies} 
                onCardDelete={onCardDelete} 
                type="saved-movies"/>
            : 
            ''}
            
        </section>
    )
}