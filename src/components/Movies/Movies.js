import React from "react";
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies(){
    return(
        <div className="movies">
            <SearchForm/>
            <div className="movies__short-movies-container">
                <button className="movies__short-movies-btn"></button>
                <p className="movies__short-movies-lable">Короткометражки</p>
            </div>
            <MoviesCardList/>
            <button className="movies__more-btn">Ещё</button>
        </div>
    )
}