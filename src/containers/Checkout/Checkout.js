import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import CheckoutItems from '../../components/Checkout/CheckoutItems/CheckoutItems';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

    state = {
        cart: null,
        order: null
    }

    componentDidMount () {
        this.loadCart();
    }

    loadCart() {
        let cart;

        if (localStorage.getItem('cart') && localStorage.getItem('cart') !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));

            this.setState({ cart: cart });
        }

    }

    quantityUpdateHandler (e) {
        console.log('update quantity');
    }

    quantityBlurHandler (e) {
        console.log('blur quantity');
    }

    removeQuantityHandler (index) {
        let cart = this.state.cart;

        if (cart.items[index].quantity > 1) {
            cart.items[index].quantity = cart.items[index].quantity - 1;
            this.updateCart(cart);
        }
    }

    addQuantityHandler (index) {
        let cart = this.state.cart;

        if (cart.items[index].quantity < 25) {
            cart.items[index].quantity = cart.items[index].quantity + 1;
            this.updateCart(cart);
        }
    }

    updateCart (cart) {
        this.setState({ cart: cart }, function() {
            localStorage.setItem('cart', JSON.stringify(cart));
        });

        this.calculateTotalPrice();
    }

    calculateTotalPrice () {
        let cart = this.state.cart,
            updatedPrice = 0;

        cart.items.forEach(function(item) {
            updatedPrice = updatedPrice + (item.price * item.quantity);
        });

        cart.totalPrice = updatedPrice;

        this.setState({ cart: cart });
    }

    placeOrderHandler () {
        console.log('place order');
        let cart = this.state.cart,
            orders = [];

        if (localStorage.getItem('orders')) {
            orders = JSON.parse(localStorage.getItem('orders'));
        }

        let order = {
            orderId: 100001,
            datePlaced: new Date(),
            cart: cart
        }

        this.setState({ order: order }, function() {
            orders.push(this.state.order);
            localStorage.setItem('orders', JSON.stringify(orders));
            this.clearCart();
        });
    }

    clearCart () {
        localStorage.removeItem('cart');

        this.setState({ cart: null });
    }

    render () {
        let cart = (
            <div className="checkout__empty-container text-center">
                <h1>Your Cart is Empty</h1>
                <NavLink to="/" className="button button--blue" exact>Go Shopping</NavLink>
            </div>
        )

        if (this.state.cart !== null) {
            cart = (
                <div className="checkout__cart-container lg:flex lg:justify-between">
                    <CheckoutItems
                        cart={this.state.cart}
                        blur={this.quantityBlurHandler.bind(this)}
                        updateQuantity={this.quantityUpdateHandler.bind(this)}
                        removeQuantity={this.removeQuantityHandler.bind(this)}
                        addQuantity={this.addQuantityHandler.bind(this)}
                    />
                    <CheckoutSummary cart={this.state.cart} placeOrder={this.placeOrderHandler.bind(this)} />
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
