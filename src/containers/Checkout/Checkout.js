import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutItems from '../../components/Checkout/CheckoutItems/CheckoutItems';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';

import * as actions from '../../store/actions/index';


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

    quantityUpdateHandler = (index, e) => {
        let cart = this.state.cart,
            el = e.target,
            quantity = el.value;

        if (quantity >= 25) {
            quantity = 25;
        } else if (quantity < 1) {
            quantity = '';
        }

        cart.items[index].quantity = quantity;
        this.updateCart(cart);

    }

    quantityBlurHandler = (index, e) => {
        let cart = this.state.cart,
            el = e.target;

        if (el.value === '') {
            cart.items[index].quantity = 1;
            this.updateCart(cart);
        }
    }

    removeQuantityHandler = (index) => {
        let cart = this.state.cart;

        if (cart.items[index].quantity > 1) {
            cart.items[index].quantity = cart.items[index].quantity - 1;
            this.updateCart(cart);
        }
    }

    addQuantityHandler = (index) => {
        let cart = this.state.cart;

        if (cart.items[index].quantity < 25) {
            cart.items[index].quantity = cart.items[index].quantity + 1;
            this.updateCart(cart);
        }
    }

    removeItemHandler = (index) => {
        let cart = this.state.cart;

        cart.items.splice(index, 1);
        this.updateCart(cart);
    }

    updateCart = (cart) => {
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

    placeOrderHandler = () => {
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

        if (this.props.isAuth) {
            this.setState({ order: order }, function() {
                orders.push(this.state.order);
                localStorage.setItem('orders', JSON.stringify(orders));
                this.clearCart();
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login');
        }


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
                        blur={this.quantityBlurHandler}
                        updateQuantity={this.quantityUpdateHandler}
                        removeQuantity={this.removeQuantityHandler}
                        addQuantity={this.addQuantityHandler}
                        removeItem={this.removeItemHandler}
                    />
                    <CheckoutSummary
                        cart={this.state.cart}
                        placeOrder={this.placeOrderHandler}
                        isAuth={this.props.isAuth}
                    />
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

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
