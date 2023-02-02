import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";

export default function Movies({ 
    movies, 
    loadMore, 
    foundMovies, 
    searchMovies, 
    isFiltering, 
    handleChangeCheckbox, 
    isLoading, 
    notFoundMovie, 
    saveMovie, 
    deleteMovie,
    savedMovies
}){
    const [search, setSearch] = React.useState(() => localStorage.getItem('search')|| '');

    function handleSearchMovies(search) {
        localStorage.setItem('search', search);
        setSearch(search);
        searchMovies(search);
    }

    return(
        <section className="movies">
            <SearchForm 
                handleSearchMovies={handleSearchMovies} 
                search={search} 
                setSearch={setSearch} 
            />
            <FilterCheckbox 
                isFiltering={isFiltering} 
                handleChangeCheckbox={handleChangeCheckbox}
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
                            saveMovie={saveMovie} 
                            deleteMovie={deleteMovie} 
                            savedMovies={savedMovies}
                            type="movies"/>
                        :
                        <span className="movies__error">{notFoundMovie}</span>
                    }
                </>
            }
        </section>
    )
}