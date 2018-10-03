import axios from 'axios';

import * as actions from './actions';

export const addToCart = (userId, items, totalPrice) => {
    let cart = {
        userId: userId,
        items: items,
        totalPrice: totalPrice
    }

    localStorage.setItem('cart', JSON.stringify(cart));

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
    localStorage.setItem('cart', JSON.stringify(cart));

    return {
        type: actions.CART_UPDATE,
        cart: cart
    }
}

export const emptyCart = (userId) => {
    localStorage.removeItem('cart');

    return {
        type: actions.CART_EMPTY,
        userId: userId
    }
}

export const cartCheckState = (userId) => {
    return dispatch => {
        const cart = JSON.parse(localStorage.getItem('cart'));

        if (!cart) {
            dispatch(emptyCart(userId));
        } else {
            dispatch(updateCart(cart));
        }
    }
}
