import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useSelector } from "react-redux";

export default function MoviesCardList({ movies, loadMore, type, foundMovies, onCardLike, onCardDelete, savedMovies}){ 
    const theme = useSelector(state=>state.theme.value);

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
            <button onClick={loadMore} className={`elements__more-btn elements__more-btn_theme_${theme} ${ foundMovies.length === movies.length?'elements__more-btn_hidden':''}`}>Ещё</button>
            }
        </section> 
    )
}