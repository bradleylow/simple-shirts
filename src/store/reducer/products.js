import * as actions from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
    products: []
}

export const productsGet = (state, action) => {
    return updateObject(state, {
        products: action.products
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.PRODUCTS_SET: return productsGet(state, action);
        default:
            return state;
    }
}

export default reducer;
