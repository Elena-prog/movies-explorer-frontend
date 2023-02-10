import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, loadMore, type, foundMovies, onCardLike, onCardDelete, savedMovies}){ 
    return(
        <section className="elements">
            <ul className="elements__group">
                {movies.map((movie) => {
                    return(<MoviesCard
                        key={movie.id} 
                        movie={movie}
                        type={type}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        savedMovies={savedMovies}
                    />   
                    )})
                }
            </ul>
            {type === 'movies'
            && 
            <button onClick={loadMore} className={`elements__more-btn ${ foundMovies.length === movies.length?'elements__more-btn_hidden':''}`}>Ещё</button>
            }
        </section> 
    )
}