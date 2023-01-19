import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import allMovies from '../../tempDB';

export default function MoviesCardList({ movies, loadMore, type}){
    return(
        <section className="elements">
            <ul className="elements__group">
                {movies.map( (movie) => {
                    return(<MoviesCard
                        key={movie.id}
                        movie={movie}
                        type={type}
                    />   
                    )
                })}
            </ul>
            <button onClick={loadMore} className={`elements__more-btn elements__more-btn_type_${type} ${ allMovies.length === movies.length?'elements__more-btn_hidden':''}`}>Ещё</button>
        </section> 
    )
}