import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import OrderItems from '../../components/OrderItems/OrderItems';
import Loader from '../../components/UI/Loader/Loader';

import axios from 'axios';

import * as actions from '../../store/actions/index';

class Dashboard extends Component {

    state = {
        orders: null,
        ordersError: false
    }

    componentWillMount () {
        this.getOrders(this.props.token, this.props.userId);
    }

    getOrders (token, userId) {
        let orders = [];

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('/order.json' + queryParams)
            .then(response => {

                for (let key in response.data) {
                    orders.push(response.data[key]);
                }

                // Sort orders by order id DESC
                orders.sort((a, b) => b.id - a.id).slice(0, 3);

                this.setState({ orders: orders });
            })
            .catch(error => {
                this.setState({ ordersError: true })
            });
    }

    logoutHandler = () => {
        this.props.onSetAuthRedirectPath('/dashboard');
        this.props.onLogout();
        this.props.emptyCart(this.props.userId);
        this.props.history.push('/');
    }

    dismissError = () => {
        this.setState({ ordersError: false });
    }

    render () {
        let ordersError = null;

        if (this.state.ordersError === true) {
            ordersError = (
                <div className="modal modal--error">
                    <div className="modal__content">
                        <h5 className="text-center mb-8">Something went wrong!</h5>
                        <p>Your orders could not be found at the moment. Please refresh the page or view at a later time.</p>
                        <div className="button-wrapper mt-12 text-center">
                            <button className="button button--small button--blue" onClick={this.dismissError}>Dismiss</button>
                        </div>
                    </div>
                </div>
            )
        }

        let orderItems = <Loader type="inject" />

        if (this.state.orders) {
            if (this.state.orders.length > 0) {
                orderItems = (
                    <OrderItems orders={this.state.orders} />
                )
            } else {
                orderItems = (
                    <div className="empty-orders my-12 text-center">
                        <h3 className="mb-12">You currently do not have any orders.</h3>
                        <NavLink to="/" className="button button--blue" exact>Go Shopping</NavLink>
                    </div>
                )
            }
        }

        return (
            <div className="dashboard-page dashboard">
                {ordersError}
                <div className="dashboard__intro">
                    <h3 className="mb-6">Welcome to your Dashboard!</h3>
                    <p>You are logged in as <span className="font-medium">{this.props.userEmail}</span></p>
                </div>
                <div className="order-container mt-24 px-4 lg:px-0">
                    <h4 className="order-container__heading">Orders</h4>
                    {orderItems}
                </div>
                <div className="button__wrapper my-12 text-center lg:text-right">
                    <button className="button button--small button--danger" onClick={this.logoutHandler}>Logout</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userEmail: state.auth.email,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onLogout: () => dispatch(actions.logout()),
        emptyCart: (userId) => dispatch(actions.emptyCart(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
