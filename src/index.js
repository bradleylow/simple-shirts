import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './assets/css/tailwind.css';
import './assets/css/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducer/auth';
import cartReducer from './store/reducer/cart';
import productReducer from './store/reducer/products';

import axios from 'axios';

axios.defaults.baseURL = 'https://simple-shirts.firebaseio.com';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    products: productReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
registerServiceWorker();
