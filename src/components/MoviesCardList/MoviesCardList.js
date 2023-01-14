import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({onSaveClick, movies}){

    const widthScreen = window.innerWidth;
    let count; 
    let i;
    
    if(widthScreen > 1100){
        count = 12;
        i = 3;
    } else if(widthScreen < 1100 && widthScreen > 690){
        count = 8;
        i = 2;
    } else if(widthScreen < 690){
        count = 5;
        i = 1;
    }

    const [num ,setNum] = React.useState(count)
    const [loadMovies, setLoadMovies] = React.useState(movies.slice(0, num));


    function loadMore(){
        setLoadMovies([...loadMovies, ...movies.slice(num, num + i)]);
        setNum(num + i);
    };
 

    return(
        <section className="elements">
            <ul className="elements__group">
                {loadMovies.map( (movie, index) => {
                    return(<MoviesCard
                        key={index}
                        movie={movie} 
                        handleSaveClick={onSaveClick} 
                    />   
                    )
                })}
            </ul>
            <button onClick={loadMore} className={`elements__more-btn ${loadMovies.length === movies.length?'elements__more-btn_hidden':''}`}>Ещё</button>
        </section> 
    )
}