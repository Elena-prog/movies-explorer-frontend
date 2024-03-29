import React from "react";
import './FilterCheckbox.css';

export default function FilterCheckbox({isFiltering, onChangeCheckbox}){
    return(
    <div className="filter">
        <label  
            htmlFor='checkbox' 
            className="filter__label">
            <input 
                type="checkbox" 
                id='checkbox' 
                className="filter__checkbox"
                name="checkbox"
                checked={isFiltering}
                onChange={onChangeCheckbox}
            />
            <span className="filter__slider"></span>
        </label>
        <span className="filter__shorts">Короткометражки</span>
    </div>
    )
}