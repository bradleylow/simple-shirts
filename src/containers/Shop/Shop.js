import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import ProductItems from '../../components/ProductItems/ProductItems';

class Shop extends Component {
    state = {
        products: [
            {
                name: 'Blue SS',
                price: '14.95',
                image: 'blue-shirt.jpg'
            },
            {
                name: 'Cobalt SS',
                price: '14.95',
                image: 'cobalt-shirt.jpg'
            },
            {
                name: 'Green SS',
                price: '14.95',
                image: 'green-shirt.jpg'
            },
            {
                name: 'Grey SS',
                price: '14.95',
                image: 'grey-shirt.jpg'
            },
            {
                name: 'Purple SS',
                price: '14.95',
                image: 'purple-shirt.jpg'
            }
        ]
    }

    render () {
        return (
            <Aux>
                <ProductItems products={this.state.products} />
            </Aux>

        );
    }
}

export default Shop;
