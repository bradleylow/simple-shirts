import axios from 'axios';

import * as actions from './actions';

export const updateCart = (cart, token, userId) => {
    localStorage.setItem('cart', JSON.stringify(cart));

    if (token && userId) {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('/cart.json' + queryParams)
            .then(response => {
                if (Object.keys(response.data).length === 0) {
                    return axios.post('/cart.json?auth=' + token, cart);
                } else {
                    let cartKey = null;

                    for (let key in response.data) {
                        cartKey = key;
                    }

                    let data = {
                        [cartKey]: cart
                    }

                    const queryParams = '?auth=' + token + '&userId="' + userId + '"';
                    return axios.patch('/cart.json' + queryParams, data);
                }
            })
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            });
    }

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

export const addToCart = (token, userId, items, totalPrice) => {
    return dispatch => {
        let cart = {
           userId: userId,
           items: items,
           totalPrice: totalPrice
        }

        dispatch(updateCart(cart, token, userId));
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

                        if (fetchedCart.items) {
                            fetchedCart.items.forEach( fetchedItem => {
                                mergedItems.push(fetchedItem);
                            });
                        }

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
                        localCart.userId = userId;
                        updatedCart = localCart;
                    } else if (!localCart && fetchedCart) {
                        updatedCart = fetchedCart;
                    } else {
                        dispatch(updateCart({userId: userId, items: [], totalPrice: 0 }, token, userId ));
                    }

                    if (updatedCart) {
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                        dispatch(updateCart(updatedCart, token , userId));
                    }
                });
        }
    }
}
