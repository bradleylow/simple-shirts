import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutItems from '../../components/Checkout/CheckoutItems/CheckoutItems';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';

import * as actions from '../../store/actions/index';


class Checkout extends Component {

    state = {
        cart: null
    }

    componentWillMount () {
        this.setState({
            cart: this.props.cart
        });

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
        let totalPrice = this.calculateTotalPrice();

        cart.totalPrice = totalPrice;

        this.setState({ cart: cart });
        this.props.updateCart(cart);
    }

    calculateTotalPrice () {
        let cart = this.state.cart,
            updatedPrice = 0;

        cart.items.forEach(function(item) {
            updatedPrice = updatedPrice + (item.price * item.quantity);
        });

        return updatedPrice;
    }

    placeOrderHandler = () => {
        let cart = this.state.cart;

        if (this.props.isAuth) {
            this.props.emptyCart(this.props.userId);
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

        if (this.state.cart.items.length > 0) {
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
        isAuth: state.auth.token != null,
        userId: state.auth.userId,
        cart: state.cart.cart
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        updateCart: (cart) => dispatch(actions.updateCart(cart)),
        emptyCart: (userId) => dispatch(actions.emptyCart(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
