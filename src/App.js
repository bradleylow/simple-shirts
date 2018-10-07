import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Checkout from './containers/Checkout/Checkout';
import Dashboard from './containers/Dashboard/Dashboard';
import Shop from './containers/Shop/Shop';
import Product from './containers/Product/Product';
import NotFound from './containers/NotFound/NotFound';

import * as actions from './store/actions/index';

class App extends Component {

    componentWillMount () {
        this.props.onAutoSignin();
        this.props.onAutoSetCart(localStorage.getItem('userId'));
        this.props.onGetProducts();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/product/:id" component={Product} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/login" component={Auth} />
                <Route path="/" exact component={Shop} />
                <Route component={NotFound} />
            </Switch>
        )

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/product/:id" component={Product} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/login" component={Auth} />
                    <Route path="/" exact component={Shop} />
                    <Route component={NotFound} />
                </Switch>
            )
        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null || localStorage.getItem('token') !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProducts: () => dispatch(actions.productsGet()),
        onAutoSignin: () => dispatch(actions.authCheckState()),
        onAutoSetCart: (userId) => dispatch(actions.cartCheckState(userId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
