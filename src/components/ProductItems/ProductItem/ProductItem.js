import React from 'react';
import { NavLink } from 'react-router-dom'

const productItem = (props) => {
    return (
        <div className="products__item w-1/2 lg:w-1/3 px-2 lg:px-4 mb-6 lg:mb-12" data-id={props.product.id}>
            <NavLink to={'/product/' + props.product.id} className="block text-center lg:text-left">
                <div className="products__img-container image-cover">
                    <img src={require('../../../assets/images/' + props.product.image)} alt="Cobalt T-shirt" className="products__img" />
                </div>
                <div className="products__name mt-4">
                    <h5>{props.product.name}</h5>
                </div>
                <div className="products__price mt-2">
                    <p>${props.product.price}</p>
                </div>
            </NavLink>
        </div>
    );
};

export default productItem;
