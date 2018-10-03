import * as actions from '../actions/actions';
import { updateObject } from '../utility';

const initialState = {
    cart: {
        userId: null,
        items: [],
        totalPrice: 0
    }
};

const cartAdd = (state, action) => {
    return updateObject(state, {
        cart: action.cart
    });
}

const cartUpdate = (state, action) => {
    return updateObject(state, {
        cart: action.cart
    });
}

const cartEmpty = (state, action) => {    
    return updateObject(state, {
        cart: {
            userId: action.userId,
            items: [],
            totalPrice: 0
        }
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CART_ADD: return cartAdd(state, action);
        case actions.CART_UPDATE: return cartUpdate(state, action);
        case actions.CART_EMPTY: return cartEmpty(state, action);
        default:
            return state;
    }
}

export default reducer;
