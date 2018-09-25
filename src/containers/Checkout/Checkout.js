import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import CheckoutItems from '../../components/Checkout/CheckoutItems/CheckoutItems';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

    state = {
        cart: null
    }

    componentDidMount() {
        this.loadCart();
    }

    loadCart() {
        let cart;

        if (localStorage.getItem('cart') && localStorage.getItem('cart') !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));

            this.setState({ cart: cart }, function() {
                // this.filterUniqueItems(this.state.cart);
            });
        }

    }
    //
    // filterUniqueItems(cart) {
    //     let items = cart.items;
    //
    //     let uniqueItems = [];
    //
    //     items.forEach(function(item) {
    //
    //         uniqueItems.forEach(function(uniqueItem) {
    //             if () {
    //                 console.log(item);
    //                 return false;
    //             } else {
    //                 uniqueItems.push(item);
    //             }
    //         });
    //
    //     });
    //
    //     console.log(uniqueItems);
    //
    // }

    render () {
        let cart = (
            <div className="checkout__empty-container text-center">
                <h1>Your Cart is Empty</h1>
                <NavLink to="/" className="button button--blue" exact>Go Shopping</NavLink>
            </div>
        )

        if (this.state.cart !== null) {
            cart = (
                <div className="checkout__cart-container flex">
                    <CheckoutItems cart={this.state.cart} />
                    <CheckoutSummary cart={this.state.cart} />
                </div>
            )
        }

        return (
            <div className="checkout">
                {cart}
            </div>
        );
    }
}

export default Checkout;
