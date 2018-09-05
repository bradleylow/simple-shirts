import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import ProductItems from '../../components/ProductItems/ProductItems';

import axios from 'axios';

class Shop extends Component {
    state = {
        products: null
    }

    componentDidMount() {
        axios.get('https://simple-shirts.firebaseio.com/products.json')
            .then( response => {
                this.setState({ products: response.data });
            });
    }

    render () {
        let productItems = null;

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
