import React, { Component } from 'react';

import RadioButton from '../../components/UI/FormElements/RadioButton/RadioButton';
import Loader from '../../components/UI/Loader/Loader';

import axios from 'axios';

class Product extends Component {
    state = {
        userId: null,
        product: {},
        quantity: 1,
        size: '',
        cart: {
            userId: 1,
            items: [],
            totalPrice: null
        }
    }

    componentDidMount() {
        this.loadCart();
        this.loadProduct();
    }

    loadCart() {
        if (this.state.userId === null) {
            let localCart = JSON.parse(localStorage.getItem('cart'));
            this.setState({ cart: localCart }, function() {
                console.log(this.state.cart);
            });
        } else {
            axios.get('/cart.json')
                .then(response => {
                    let carts = Object.keys(response.data).map(i => response.data[i]),
                        userCart;

                    for (let i = 0; i < carts.length; i++) {
                        if (carts[i].userId == this.state.userId) {
                            userCart = carts[i];
                        }
                    }

                    this.setState({ cart: userCart });
                });
        }
    }

    loadProduct() {
        if (this.props.match.params.id) {
            axios.get('/products.json')
                .then(response => {
                    let products = response.data;

                    for (let i = 0; i < products.length; i++) {
                        if (products[i].id == this.props.match.params.id) {
                            this.setState({ product: products[i] });
                        }
                    }

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

        this.setState({ quantity: parseInt(quantity, 10) });

    }

    quantityBlurHandler(e) {
        let el = e.target;

        if (el.value === '') {
            this.setState({ quantity: 1 })
        }
    }

    maybeAddToCartHandler() {
        if (this.state.size !== '') {
            this.addToCart();
        } else {
            // TODO show size error
        }
    }

    addToCart(cart) {
        let items = [],
            totalPrice = 0;

        for (let i = 0; i < this.state.quantity; i++) {
            this.state.product.size = this.state.size;
            items.push(this.state.product);
        }

        for (let i = 0; i < items.length; i++) {
            totalPrice = totalPrice + items[i].price;
        }

        this.setState({
            cart: {
                userId: this.state.userId,
                items: items,
                totalPrice: totalPrice
            }
        }, function() {
            let data = {
                userId: this.state.cart.userId,
                items: this.state.cart.items,
                totalPrice: this.state.cart.totalPrice
            }

            if (this.state.userId === null) {
                localStorage.setItem('cart', JSON.stringify(this.state.cart));
            } else {
                axios.post('/cart.json', data)
                    .then(response => {
                        // this.props.history.push('/checkout')
                    });
            }


        });
    }

    render () {
        let productImg = <Loader type="inject"/>;

        if (this.state.product.image) {
            productImg = (
                <img src={require('../../assets/images/' + this.state.product.image)} alt={this.state.product.name + ' image'} className="product-page__img"/>
            )
        }

        return (
            <div className="product-page">
                <div className="product-page__product flex flex-wrap lg:px-6 lg:-mx-12">
                    <div className="product-page__img-container image-cover w-full lg:w-2/3 lg:px-6">
                        {productImg}
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
                                <button className="product-actions__button button button--blue add-to-cart w-full" onClick={this.maybeAddToCartHandler.bind(this)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
