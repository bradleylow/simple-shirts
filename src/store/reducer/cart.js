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
        cart: {
            userId: action.cart.userId,
            items: action.cart.items,
            totalPrice: action.cart.totalPrice
        }
    });
}

const cartUpdate = (state, action) => {
    localStorage.setItem('cart', action.cart);
    
    return updateObject(state, {
        cart: action.cart
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CART_ADD: return cartAdd(state, action);
        case actions.CART_UPDATE: return cartUpdate(state, action);
        default:
            return state;
    }
}

export default reducer;
