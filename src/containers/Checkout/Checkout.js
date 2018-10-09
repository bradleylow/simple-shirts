import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutItems from '../../components/Checkout/CheckoutItems/CheckoutItems';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import Loader from '../../components/UI/Loader/Loader';

import axios from 'axios';

import * as actions from '../../store/actions/index';


class Checkout extends Component {

    state = {
        cart: null,
        orderError: false,
        orderPlaced: false
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

        cart.totalPrice = totalPrice

        this.setState({ cart: cart });
        this.props.updateCart(cart, this.props.token, this.props.userId);
    }

    calculateTotalPrice () {
        let cart = this.state.cart,
            updatedPrice = 0;

        cart.items.forEach(function(item) {
            updatedPrice = updatedPrice + (item.price * item.quantity);
        });

        return updatedPrice;
    }

    maybePlaceOrderHandler = () => {
        if (!this.props.isAuth) {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login');
        } else {
            this.placeOrder();
            this.setState({ orderPlaced: true })
        }
    }

    placeOrder () {
        axios.get('/order.json?auth=' + this.props.token)
            .then(response => {
                const baseOrderId = 100000;

                let numOrders = null,
                    datePlaced = new Date();

                if (!response.data) {
                    numOrders = 0
                } else {
                    numOrders = Object.keys(response.data).length;
                }

                let order = {
                    id: baseOrderId + numOrders + 1,
                    userId: this.props.userId,
                    orderData: this.props.cart,
                    datePlaced: datePlaced
                }

                return axios.post('/order.json?auth=' + this.props.token, order);
            })
            .then(response => {

                let emptyCart = {
                    userId: this.props.userId,
                    items: [],
                    totalPrice: 0
                }

                this.props.updateCart(emptyCart, this.props.token, this.props.userId);
                this.props.emptyCart(this.props.userId);
                this.props.history.push('/dashboard');
            })
            .catch(error => {
                this.setState({ orderError: true })
            });

    }

    dismissError = () => {
        this.setState({ orderError: false });
    }

    render () {
        let orderError = null;

        if (this.state.orderError === true) {
            orderError = (
                <div className="modal modal--error">
                    <div className="modal__content">
                        <h5 className="text-center mb-8">Something went wrong!</h5>
                        <p>Your order was not placed. Please try again at a later time.</p>
                        <div className="button-wrapper mt-12 text-center">
                            <button className="button button--small button--blue" onClick={this.dismissError}>Dismiss</button>
                        </div>
                    </div>
                </div>
            )
        }

        let orderPlaced = null;

        if (this.state.orderPlaced) {
            orderPlaced = <Loader type="inject" />;
        }

        let cart = (
            <div className="checkout__empty-container text-center">
                <h1>Your Cart is Empty</h1>
                <NavLink to="/" className="button button--blue" exact>Go Shopping</NavLink>
            </div>
        )

        if (this.state.cart.items && this.state.cart.items.length > 0) {
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
                        placeOrder={this.maybePlaceOrderHandler}
                        isAuth={this.props.isAuth}
                    />
                </div>
            )
        }

        return (
            <div className="checkout">
                {orderPlaced}
                {orderError}
                {cart}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
        token: state.auth.token,
        userId: state.auth.userId,
        cart: state.cart.cart
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        updateCart: (cart, token, userId) => dispatch(actions.updateCart(cart, token, userId)),
        emptyCart: (userId) => dispatch(actions.emptyCart(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
