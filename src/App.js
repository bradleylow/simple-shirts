import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Shop from './containers/Shop/Shop';
import Product from './containers/Product/Product';

class App extends Component {

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/product/:id" component={Product} />
                    <Route path="/" exact component={Shop} />
                </Switch>
            </Layout>
        );
    }
}

export default App;
