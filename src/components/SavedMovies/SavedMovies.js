import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SavedMovies({ 
    movies, 
    onCardDelete, 
    // isFiltering, 
    // onChangeCheckbox, 
    onSearchSavedMovies
}){

    const [search, setSearch] = React.useState('');
    const [isFiltering, setIsFiltering] = React.useState(false)

    function handleSearchMovies(search) {
        onSearchSavedMovies(search);
        setSearch(search)
    }

    function onChangeCheckbox() {
        setIsFiltering(!isFiltering);
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
                movies={isFiltering? movies.filter((item)=> item.duration <= 40): movies} 
                onCardDelete={onCardDelete} 
                type="saved-movies"/>
            : 
            ''}
            
        </section>
    )
}