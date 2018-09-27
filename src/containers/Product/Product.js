import React, { Component } from 'react';

import RadioButton from '../../components/UI/FormElements/RadioButton/RadioButton';
import QuantityField from '../../components/UI/FormElements/QuantityField/QuantityField';
import Loader from '../../components/UI/Loader/Loader';

import axios from 'axios';

class Product extends Component {
    state = {
        userId: null,
        product: {},
        quantity: 1,
        size: '',
        sizeError: false,
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

            if (localStorage.getItem('cart')) {
                let localCart = JSON.parse(localStorage.getItem('cart'));
                this.setState({ cart: localCart });
            }

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

        this.setState({
            size: el.value,
            sizeError: false
        });
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
    }x

    maybeAddToCartHandler() {
        if (this.state.size !== '') {
            this.addToCart();
            this.setState({ sizeError: false });
        } else {
            this.setState({ sizeError: true });
        }
    }

    addToCart(cart) {
        let items = this.state.cart.items,
            product = this.state.product;

        product.size = this.state.size;
        product.quantity = this.state.quantity;

        let foundIndex = items.findIndex(item => item.id === this.state.product.id && item.size === this.state.size);

        if (foundIndex !== -1) {
            items[foundIndex].quantity = items[foundIndex].quantity + this.state.quantity;
        } else {
            items.push(product);
        }

        let productTotalPrice = product.price * product.quantity;
        let totalPrice = this.state.cart.totalPrice + productTotalPrice;

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
                this.props.history.push('/checkout');
            } else {
                axios.post('/cart.json', data)
                    .then(response => {
                        this.props.history.push('/checkout');
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

        let sizeError = null;

        if (this.state.sizeError) {
            sizeError = (
                <div className="size-selector__error">
                    <p>Please select a size.</p>
                </div>
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
                                {sizeError}
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
                            <QuantityField
                                value={isNaN(this.state.quantity) ? '' : this.state.quantity}
                                removeQuantity={this.removeQuantityHandler.bind(this)}
                                addQuantity={this.addQuantityHandler.bind(this)}
                                change={this.updateQuantityHandler.bind(this)}
                                blur={this.quantityBlurHandler.bind(this)}
                            />
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
