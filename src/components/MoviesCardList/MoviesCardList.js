import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, loadMore, type, foundMovies, saveMovie, deleteMovie, isFiltering}){ 

    return(
        <section className="elements">
            <ul className="elements__group">
                {isFiltering?
                movies
                .filter((item)=> item.duration < 40)
                .map( (movie) => {
                    let uniqueKey;
                    if(type === "movies"){
                        uniqueKey = movie.id;
                    }
                    if(type === "saved-movies"){
                        uniqueKey = movie.movieId;
                    }
                    return(<MoviesCard
                        key={uniqueKey} 
                        movie={movie}
                        type={type}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                    />   
                    )
                })
                :
                movies
                .map( (movie) => {
                    let uniqueKey;
                    if(type === "movies"){
                        uniqueKey = movie.id;
                    }
                    if(type === "saved-movies"){
                        uniqueKey = movie.movieId;
                    }
                    return(<MoviesCard
                        key={uniqueKey} 
                        movie={movie}
                        type={type}
                        saveMovie={saveMovie}
                        deleteMovie={deleteMovie}
                    />   
                    )
                })
                }
            </ul>
            {type === movies? 
            <button onClick={loadMore} className={`elements__more-btn elements__more-btn_type_${type} ${ foundMovies.length === movies.length?'elements__more-btn_hidden':'elements__more-btn_visible'}`}>Ещё</button>
            :
            ''}
        </section> 
    )
}