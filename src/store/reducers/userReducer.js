import {SET_CURRENT_USER} from '../actions/action';

const initialState = JSON.parse(localStorage.getItem("currentUser"));

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
             return {...state, ...action.payload}
        default:
            return state
    }
}