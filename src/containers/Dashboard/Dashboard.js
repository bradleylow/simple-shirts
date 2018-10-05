import React, { Component } from 'react';
import { connect } from 'react-redux';

import OrderItems from '../../components/OrderItems/OrderItems';

import axios from 'axios';

import * as actions from '../../store/actions/index';

class Dashboard extends Component {

    state = {
        orders: []
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
    }

    logoutHandler = () => {
        this.props.onLogout();
        this.props.emptyCart(this.props.userId);
        this.props.history.push('/');
    }

    render () {
        return (
            <div className="dashboard-page dashboard">
                <div className="dashboard__intro">
                    <h3 className="mb-6">Welcome to your Dashboard!</h3>
                    <p>You are logged in as <span className="font-medium">{this.props.userEmail}</span></p>
                </div>
                <div className="order-container mt-12 px-4 lg:px-0">
                    <h4 className="order-container__heading">Orders</h4>
                    <OrderItems orders={this.state.orders} />
                </div>
                <div className="button__wrapper mt-12 text-center lg:text-right">
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
        onLogout: () => dispatch(actions.logout()),
        emptyCart: (userId) => dispatch(actions.emptyCart(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
