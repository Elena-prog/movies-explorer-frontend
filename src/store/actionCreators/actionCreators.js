import { SET_CURRENT_USER, CHANGE_THEME } from "../actions/action";

export const setCurrentUser = (value) => {
    return {
        type: SET_CURRENT_USER,
        payload: value
    }
}

export const changeTheme = (newTheme) => {
    return {
        type: CHANGE_THEME,
        payload: newTheme
    }
}