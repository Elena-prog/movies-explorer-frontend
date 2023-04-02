import React from "react";
import { useSelector } from "react-redux";
import './MoviesCard.css';

export default function MoviesCard({movie, type, onCardLike, onCardDelete, savedMovies}){
    const theme = useSelector(state=> state.theme.value)
    let movieButtonClassName;
    let url;
    let isSaved;

    if(type === "movies"){
        isSaved = savedMovies.some((i)=> i.movieId === movie.id);
        movieButtonClassName = (
            `element__button ${isSaved? "element__button_type_tick": "element__button_type_save"}`
        );
        url= movie.image.url;
    }
    if(type === "saved-movies"){
        isSaved = true;
        movieButtonClassName = (
            `element__button element__button_type_delete`
        );
        url= movie.image;
    }
 
    function handleClick() {
        if(isSaved){
            onCardDelete(movie);
        } else {
            onCardLike(movie);
        }    
    }

    return(
        <li className="element">
            <button className={movieButtonClassName} onClick={handleClick} aria-label="Сохранить."></button>
            <a className="element__container-image" href={movie.trailerLink}  rel="noreferrer" target="_blank">
                <img src={url} alt={movie.nameRu} className="element__image"/>
            </a>
            <div className="element__caption">
                <h3 className="element__title">{movie.nameRU}</h3>
                <div className={`element__duration element__duration_theme_${theme}`}>{`${Math.floor(movie.duration/60)}ч ${movie.duration % 60}м`}</div>
            </div>
        </li>
    )
}