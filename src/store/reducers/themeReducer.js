import { CHANGE_THEME } from "../actions/action"

const initialState = {
    value:  localStorage.getItem('theme')||'dark'
}

export default function themeReducer (state = initialState, action) {
    switch (action.type){
        case CHANGE_THEME:
            return {...state, value: action.payload}
        default:
            return state
    }
}