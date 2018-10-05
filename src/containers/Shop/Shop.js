import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import ProductItems from '../../components/ProductItems/ProductItems';
import Loader from '../../components/UI/Loader/Loader';

class Shop extends Component {

    render () {
        let productItems = <Loader type="full"/> ;

        if (this.props.products) {
            productItems = (
                <Aux>
                    <ProductItems products={this.props.products} />
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

const mapStateToProps = state => {
    return {
        products: state.products.products
    };
}


export default connect(mapStateToProps)(Shop);
