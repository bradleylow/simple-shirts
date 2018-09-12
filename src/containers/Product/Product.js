import React, { Component } from 'react';

import RadioButton from '../../components/UI/FormElements/RadioButton/RadioButton';

import axios from 'axios';

class Product extends Component {
    state = {
        product: {},
        quantity: 1,
        size: '',
        cart: {
            items: {},
            totalPrice: null
        }
    }

    componentDidMount() {
        this.loadCart();
        this.loadProduct();
    }

    loadCart() {
        axios.get('/cart.json')
            .then(response => {
                let cart = response.data;

                if (cart) {
                    this.setState({ cart: cart });
                }
            });
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

    sizeSelectorHandler(e) {
        let el = e.target;

        this.setState({ size: el.value });
    }

    addQuantityHandler() {
        if (this.state.quantity < 25) {
            this.setState({ quantity: this.state.quantity + 1 });
        }
    }

    removeQuantityHandler() {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    }

    updateQuantityHandler(e) {
        let el = e.target,
            quantity = el.value;

        if (quantity >= 25) {
            quantity = 25;
        }

        this.setState({ quantity: parseInt(quantity) });

    }

    quantityBlurHandler(e) {
        let el = e.target;

        if (el.value == '') {
            this.setState({ quantity: 1 })
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
                                <form onChange={this.sizeSelectorHandler.bind(this)}>
                                    <RadioButton
                                        classList={'size-selector__button ' + (this.state.size === 'Small' ? 'active' : '')}
                                        label="S"
                                        name="size"
                                        value="Small"
                                    />
                                    <RadioButton
                                        classList={'size-selector__button ' + (this.state.size === 'Medium' ? 'active' : '')}
                                        label="M"
                                        name="size"
                                        value="Medium"
                                    />
                                    <RadioButton
                                        classList={'size-selector__button ' + (this.state.size === 'Large' ? 'active' : '')}
                                        label="L"
                                        name="size"
                                        value="Large"
                                    />
                                    <RadioButton
                                        classList={'size-selector__button ' + (this.state.size === 'X Large' ? 'active' : '')}
                                        label="XL"
                                        name="size"
                                        value="X Large"
                                    />
                                </form>
                            </div>
                            <div className="quantity-control mb-8 lg:mb-12">
                                <div className="quantity-control__widget flex">
                                    <button
                                        className="quantity-control__button"
                                        onClick={this.removeQuantityHandler.bind(this)}>-</button>
                                    <input
                                        id="quantity-control__counter"
                                        className="quantity-control__counter"
                                        type="text"
                                        name="quantity"
                                        value={isNaN(this.state.quantity) ? '' : this.state.quantity}
                                        onChange={this.updateQuantityHandler.bind(this)}
                                        onBlur={this.quantityBlurHandler.bind(this)}/>
                                    <button
                                        className="quantity-control__button"
                                        onClick={this.addQuantityHandler.bind(this)}>+</button>
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
