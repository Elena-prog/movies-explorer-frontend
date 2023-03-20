import { SET_CURRENT_USER } from "../actions/action";

export const setCurrentUser = (value) => {
    return {
        type: SET_CURRENT_USER,
        payload: value
    }
}