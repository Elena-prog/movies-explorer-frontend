import React from "react";
import './MoviesCard.css';

export default function MoviesCard({movie, type}){
    const [isSaved, setIsSaved] = React.useState(false);
    let movieButtonClassName;
    if(type === "movies"){
        movieButtonClassName = (
            `element__button ${isSaved? "element__button_type_tick": "element__button_type_save"}`
        );  
    }
    if(type === "saved-movies"){
        movieButtonClassName = (
            `element__button element__button_type_delete`
        );  
    }
 
    function handleClick() {
        setIsSaved(!isSaved);
    }

    return(
        <li className="element">
            <button className={movieButtonClassName} onClick={handleClick} aria-label="Сохранить."></button>
            <div className="element__container-image">
                <img src={movie.image.url} alt={movie.nameRu} className="element__image"/>
            </div>
            <div className="element__caption">
                <h3 className="element__title">{movie.nameRU}</h3>
                <div className="element__duration">{`${Math.floor(movie.duration/60)}ч ${movie.duration % 60}м`}</div>
            </div>
        </li>
    )
}