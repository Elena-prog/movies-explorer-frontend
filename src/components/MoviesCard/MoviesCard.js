import React from "react";
import './MoviesCard.css';

export default function MoviesCard({movie}){

    const [isSaved, setIsSaved] = React.useState(false)

    function handleSaveClick() {
        setIsSaved(!isSaved)
    }

    return(
        <li className="element">
            <button className={`element__save-button ${isSaved? "element__save-button_hidden":''}`} onClick={handleSaveClick} aria-label="Сохранить.">Сохранить</button>
            <button className={`element__saved-button ${isSaved? "element__saved-button_active":''}`} onClick={handleSaveClick} aria-label="Сохранено."></button>
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