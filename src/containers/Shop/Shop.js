import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import ProductItems from '../../components/ProductItems/ProductItems';
import Loader from '../../components/UI/Loader/Loader';

import axios from 'axios';

class Shop extends Component {
    state = {
        products: null
    }

    componentWillMount() {
        axios.get('/products.json')
            .then( response => {
                this.setState({ products: response.data });
            });
    }

    render () {
        let productItems = <Loader type="full"/> ;

        if (this.state.products) {
            productItems = (
                <Aux>
                    <ProductItems products={this.state.products} />
                </Aux>
            )
        }

        return (
            <Aux>
                {productItems}
            </Aux>
        );
    }
}

export default Shop;
