import React, { Component } from 'react';
import { connect } from 'react-redux';

import RadioButton from '../../components/UI/FormElements/RadioButton/RadioButton';
import QuantityField from '../../components/UI/FormElements/QuantityField/QuantityField';
import Loader from '../../components/UI/Loader/Loader';

import axios from 'axios';

import * as actions from '../../store/actions/index';

class Product extends Component {
    state = {
        product: {},
        quantity: 1,
        size: '',
        sizeError: false
    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct() {
        if (this.props.match.params.id) {
            axios.get('/products.json')
                .then(response => {
                    let products = response.data;

                    for (let i = 0; i < products.length; i++) {
                        if (products[i].id === Number(this.props.match.params.id)) {
                            this.setState({ product: products[i] });
                        }
                    }

                });
        }
    }

    sizeSelectorHandler = (e) => {
        let el = e.target;

        this.setState({
            size: el.value,
            sizeError: false
        });
    }

    addQuantityHandler = () => {
        if (this.state.quantity < 25) {
            this.setState({ quantity: this.state.quantity + 1 });
        }
    }

    removeQuantityHandler = () => {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    }

    updateQuantityHandler = (e) => {
        let el = e.target,
            quantity = el.value;

        if (quantity >= 25) {
            quantity = 25;
        }

        this.setState({ quantity: parseInt(quantity, 10) });

    }

    quantityBlurHandler = (e) => {
        let el = e.target;

        if (el.value === '') {
            this.setState({ quantity: 1 })
        }
    }

    maybeAddToCartHandler = () => {
        if (this.state.size !== '') {
            this.setState({ sizeError: false });
            this.addToCart();
        } else {
            this.setState({ sizeError: true });
        }
    }

    addToCart = (cart) => {
        let items = this.props.cart.items,
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
        let totalPrice = this.props.cart.totalPrice + productTotalPrice;

        this.props.addToCart(this.props.userId, items, totalPrice);
        this.props.history.push('/checkout');
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
                                removeQuantity={this.removeQuantityHandler}
                                addQuantity={this.addQuantityHandler}
                                change={this.updateQuantityHandler}
                                blur={this.quantityBlurHandler}
                            />
                            <div className="product-actions">
                                <button className="product-actions__button button button--blue add-to-cart w-full" onClick={this.maybeAddToCartHandler}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        cart: state.cart.cart
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (userId, items, totalPrice) => dispatch(actions.addToCart(userId, items, totalPrice))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
