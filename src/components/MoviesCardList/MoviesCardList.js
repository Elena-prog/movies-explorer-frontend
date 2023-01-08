import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(){
    const movieData = [];
    return(
        <section className="elements">
            <ul className="elements__group">
                {movieData.map( (movie) => {
                    return(
                        <li className="elements__item">
                            <MoviesCard/>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}