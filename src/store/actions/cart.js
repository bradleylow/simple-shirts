import axios from 'axios';

import * as actions from './actions';

export const addToCart = (token, userId, items, totalPrice) => {
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

export const cartAuthCheckState = (token, userId) => {
    return dispatch => {
        const cart = JSON.parse(localStorage.getItem('cart'));

        let localCart = cart,
            fetchedCart = null,
            updatedCart = null;

        if (token) {
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

            axios.get('/cart.json' + queryParams)
                .then(response => {

                    for (let key in response.data) {
                        fetchedCart = response.data[key]
                    }

                    if (localCart && fetchedCart) {
                        let mergedCart = {},
                            mergedItems = [];

                        fetchedCart.items.forEach( fetchedItem => {
                            mergedItems.push(fetchedItem);
                        });

                        localCart.items.forEach(localItem => {
                            let foundIndex = mergedItems.findIndex(mergedItem => mergedItem.id === localItem.id && mergedItem.size === localItem.size);

                            if (foundIndex !== -1) {
                                mergedItems[foundIndex].quantity = mergedItems[foundIndex].quantity + localItem.quantity;
                            } else {
                                mergedItems.push(localItem);
                            }
                        });

                        mergedCart = {
                            userId: fetchedCart.userId,
                            items: mergedItems,
                            totalPrice: fetchedCart.totalPrice + localCart.totalPrice
                        }

                        updatedCart = mergedCart;
                    } else if (localCart && !fetchedCart) {
                        updatedCart = localCart;
                    } else if (!localCart && fetchedCart) {
                        updatedCart = fetchedCart;
                    } else {
                        dispatch(emptyCart(userId));
                    }

                    if (updatedCart) {
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                        dispatch(updateCart(updatedCart));
                    }
                });
        }
    }
}
