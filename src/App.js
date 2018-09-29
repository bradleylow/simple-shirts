import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Checkout from './containers/Checkout/Checkout';
import Dashboard from './containers/Dashboard/Dashboard';
import Shop from './containers/Shop/Shop';
import Product from './containers/Product/Product';

class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/product/:id" component={Product} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/login" component={Auth} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/" exact component={Shop} />
                </Switch>
            </Layout>
        );
    }
}

export default App;
