import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import ProductItems from '../../components/ProductItems/ProductItems';

class Shop extends Component {
    state = {
        products: [
            {
                id: 100001,
                name: 'Blue SS',
                price: '14.95',
                image: 'blue-shirt.jpg'
            },
            {
                id: 100002,
                name: 'Cobalt SS',
                price: '14.95',
                image: 'cobalt-shirt.jpg'
            },
            {
                id: 100003,
                name: 'Green SS',
                price: '14.95',
                image: 'green-shirt.jpg'
            },
            {
                id: 100004,
                name: 'Grey SS',
                price: '14.95',
                image: 'grey-shirt.jpg'
            },
            {
                id: 100005,
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
