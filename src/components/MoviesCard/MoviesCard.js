import React from "react";
import './MoviesCard.css';

export default function MoviesCard({movie, type, saveMovie, deleteMovie}){
    // const [isSaved, setIsSaved] = React.useState(false);
    let movieButtonClassName;
    let url;
    if(type === "movies"){
        movieButtonClassName = (
            `element__button ${movie.isSaved? "element__button_type_tick": "element__button_type_save"}`
        );
        url= movie.image.url;
    }
    if(type === "saved-movies"){
        movieButtonClassName = (
            `element__button element__button_type_delete`
        );
        url= movie.image;
        // setIsSaved(true);
    }
 
    function handleClick() {
        // setIsSaved(!isSaved);
        if(movie.isSaved || type === "saved-movies"){
            deleteMovie(movie);
        } else {
            saveMovie(movie);
        }    
    }

    return(
        <li className="element">
            <button className={movieButtonClassName} onClick={handleClick} aria-label="Сохранить."></button>
            <div className="element__container-image">
                <img src={url} alt={movie.nameRu} className="element__image"/>
            </div>
            <div className="element__caption">
                <h3 className="element__title">{movie.nameRU}</h3>
                <div className="element__duration">{`${Math.floor(movie.duration/60)}ч ${movie.duration % 60}м`}</div>
            </div>
        </li>
    )
}