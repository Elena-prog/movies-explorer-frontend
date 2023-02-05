import React from "react";
import { useNavigate } from "react-router-dom";
import './PageNotFound.css';

export default function PageNotFound() {
    const navigate = useNavigate();

    function goBack(){
        navigate(-3 );
    }

    return(
        <section className="not-found">
            <div className="not-found__container">
                <h3 className="not-found__title">404</h3>
                <p className="not-found__subtitle">Страница не найдена</p>
            </div>
                <button type="button" className="not-found__back-button" onClick={goBack}>Назад</button>
        </section>
    )
}