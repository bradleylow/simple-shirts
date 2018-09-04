import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import ProductItems from '../../components/ProductItems/ProductItems';

class Shop extends Component {
    render () {
        return (
            <Aux>
                <ProductItems />
            </Aux>

        );
    }
}

export default Shop;
