import React from 'react';

const product = (props) => {
    return (
        <div className="item__product w-full md:w-1/3 flex mb-8 md:mb-0">
            <div className="product__image w-1/2 p-4">
                <div className="image-wrapper">
                    <img src={require('../../../assets/images/' + props.product.image)} alt={props.product.name + ' Shirt'} className="products__img" />
                </div>
                <div className="price-wrapper">
                    <p></p>
                </div>
            </div>
            <div className="product__details w-1/2 p-4">
                <div className="product__detail">
                    <p className="product__name">{props.product.name}</p>
                </div>
                <div className="product__detail">
                    <span className="product__label">Size:</span>
                    <span className="product__value">
                        <p>{props.product.size}</p>
                    </span>
                </div>
                <div className="product__detail">
                    <span className="product__label">Qty:</span>
                    <span className="product__value">
                        <p>{props.product.quantity}</p>
                    </span>
                </div>
                <div className="product__detail">
                    <span className="product__label">Price:</span>
                    <span className="product__value">
                        <p>${props.product.price.toFixed(2)}</p>
                    </span>
                </div>
                <div className="product__detail">
                    <span className="product__label">Total:</span>
                    <span className="product__value">
                        <p className="font-medium">${(props.product.price * props.product.quantity).toFixed(2)}</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default product;
