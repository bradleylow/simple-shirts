import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Checkout from './containers/Checkout/Checkout';
import Dashboard from './containers/Dashboard/Dashboard';
import Shop from './containers/Shop/Shop';
import Product from './containers/Product/Product';

import * as actions from './store/actions/index';

class App extends Component {

    componentDidMount () {
        this.props.onAutoSignin();
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/product/:id" component={Product} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/login" component={Auth} />
                    <Route path="/" exact component={Shop} />
                </Switch>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignin: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
