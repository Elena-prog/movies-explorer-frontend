import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

export default function MoviesCardList({ movies, loadMore, type, foundMovies, isLoading, notFoundMovie}){
    console.log(notFoundMovie);
    return(
        <section className="elements">
            {isLoading? 
            <Preloader/>
            :
            <>
                {
                movies.length !==0 ?
                <>
                    <ul className="elements__group">
                        {  movies.map( (movie) => {
                            return(<MoviesCard
                                key={movie.id}
                                movie={movie}
                                type={type}
                            />   
                            )
                        })
                        }
                    </ul>
                    <button onClick={loadMore} className={`elements__more-btn elements__more-btn_type_${type} ${ foundMovies.length === movies.length?'elements__more-btn_hidden':'elements__more-btn_visible'}`}>Ещё</button>
                </>
                :
                <span className="elements__not-found">{notFoundMovie}</span>
            }
            </>
            }

        </section> 
    )
}