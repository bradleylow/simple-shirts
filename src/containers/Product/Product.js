import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';

import axios from 'axios';

class Product extends Component {
    state = {
        product: {},
        quantity: null,
        size: null
    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct() {
        if (this.props.match.params.id) {
            axios.get('/products.json')
                .then(response => {
                    let products = response.data;

                    products.map(product => {
                        if (product.id == this.props.match.params.id) {
                            this.setState({ product: product });
                        }
                    });
                });
        }
    }

    render () {
        return (
            <div className="product-page">
                <div className="product-page__product flex flex-wrap lg:px-6 lg:-mx-12">
                    <div className="product-page__img-container image-cover w-full lg:w-2/3 lg:px-6">
                        <img src={require('../../assets/images/blue-shirt.jpg')} alt={this.state.product.name + ' image'} className="product-page__img"/>
                    </div>
                    <div className="product-page__info w-full lg:w-1/3 px-4 lg:px-0 lg:px-6">
                        <div className="product-page__details flex flex-wrap items-center my-6">
                            <h1 className="product-page__name my-0 w-3/4">{this.state.product.name}</h1>
                            <h5 className="product-page__price w-1/4 text-right">${this.state.product.price}</h5>
                        </div>
                        <div className="product-page__description mb-12">
                            <p>{this.state.product.description}</p>
                        </div>
                        <div className="product-page__attributes">
                            <div className="size-selector mb-8 lg:mb-12">
                                <label className="size-selector__button">
                                    S
                                    <input type="radio" name="size" value="S" />
                                </label>
                                <label className="size-selector__button">
                                    M
                                    <input type="radio" name="size" value="M" />
                                </label>
                                <label className="size-selector__button">
                                    L
                                    <input type="radio" name="size" value="L" />
                                </label>
                                <label className="size-selector__button">
                                    XL
                                    <input type="radio" name="size" value="XL" />
                                </label>
                            </div>
                            <div className="quantity-control mb-8 lg:mb-12">
                                <div className="quantity-control__widget flex">
                                    <button className="quantity-control__button">-</button>
                                    <div id="quantity-control__counter" className="quantity-control__counter">1</div>
                                    <button className="quantity-control__button">+</button>
                                </div>
                            </div>
                            <div className="product-actions">
                                <button className="product-actions__button button button--blue add-to-cart w-full">Add to Cart</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Product;
