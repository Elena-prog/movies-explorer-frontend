import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {createStore, compose} from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App/App';
import {reducer} from './store/reducers/reducer'

export const store = createStore(reducer,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>

);