import React from 'react';

import CheckoutItem from './CheckoutItem/CheckoutItem';

const checkoutItems = (props) => {
    let items = props.cart.items;

    return (
        <div className="checkout__items lg:w-2/3">
            {
                items.map( (item, i) => (
                    <CheckoutItem key={i} item={item} />
                ))
            }
        </div>
    );
};

export default checkoutItems;
