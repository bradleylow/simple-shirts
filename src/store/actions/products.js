import axios from 'axios';

import * as actions from './actions';

export const setProducts = (products) => {
    return {
        type: actions.PRODUCTS_SET,
        products: products
    }
}

export const productsGet = () => {
    return dispatch => {
        let products = null;

        axios.get('/products.json')
            .then(response => {
                products = response.data;

                dispatch(setProducts(products));
            })
            .catch(error => {
                
            });
    }
}
