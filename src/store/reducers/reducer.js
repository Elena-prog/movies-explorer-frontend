import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import {userReducer} from './userReducer';

export const reducer = combineReducers({
    user: userReducer,
    theme: themeReducer
})