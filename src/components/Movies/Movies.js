import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import { useSelector } from "react-redux";

export default function Movies({ 
    movies, 
    loadMore, 
    foundMovies, 
    onSearchMovies, 
    isFiltering, 
    onChangeCheckbox, 
    isLoading, 
    notFoundMovieError, 
    onCardLike, 
    onCardDelete,
    savedMovies,
    setSearch,
    search

}){
    const theme = useSelector(state=>state.theme.value);
    function handleSearchMovies(search) {
        localStorage.setItem('search', search);
        onSearchMovies(search);
    }

    return(
        <section className={`movies movies_theme_${theme}`}>
            <SearchForm 
                handleSearchMovies={handleSearchMovies} 
                search={search} 
                setSearch={setSearch}
                type="movies"
            />
            <FilterCheckbox 
                isFiltering={isFiltering} 
                onChangeCheckbox={onChangeCheckbox}
            />
            {isLoading?
                <Preloader/>
                :
                <>
                    {movies.length !==0 ?
                        <MoviesCardList 
                            movies={movies} 
                            loadMore={loadMore} 
                            foundMovies={foundMovies} 
                            onCardLike={onCardLike} 
                            onCardDelete={onCardDelete} 
                            savedMovies={savedMovies}
                            type="movies"/>
                        :
                        <span className="movies__error">{notFoundMovieError}</span>
                    }
                </>
            }
        </section>
    )
}