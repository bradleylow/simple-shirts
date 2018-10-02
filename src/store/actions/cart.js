import axios from 'axios';

import * as actions from './actions';

export const addToCart = (userId, items, totalPrice) => {
    return {
        type: actions.CART_ADD,
        cart: {
            userId: userId,
            items: items,
            totalPrice: totalPrice
        }
    }
}

export const updateCart = (cart) => {
    return {
        type: actions.CART_UPDATE,
        cart: cart
    }
}
