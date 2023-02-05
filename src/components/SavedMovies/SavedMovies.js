import React from "react";
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {SHORTS_MOVIE_DURATION} from "../../constants";

export default function SavedMovies({ 
    movies, 
    onCardDelete, 
    onSearchSavedMovies
}){
    const [isFiltering, setIsFiltering] = React.useState(false)

    function handleSearchMovies(search) {
        onSearchSavedMovies(search);
    }

    function onChangeCheckbox() {
        setIsFiltering(!isFiltering);
    }

    return(
        <section className="saved-movies">
            <SearchForm 
                handleSearchMovies={handleSearchMovies}
                type="saved-movies"
                />
            <FilterCheckbox 
                isFiltering = {isFiltering} 
                onChangeCheckbox={onChangeCheckbox}
            />
            {movies?
            <MoviesCardList 
                movies={isFiltering? movies.filter((item)=> item.duration <= SHORTS_MOVIE_DURATION): movies} 
                onCardDelete={onCardDelete} 
                type="saved-movies"/>
            : 
            ''}
            
        </section>
    )
}