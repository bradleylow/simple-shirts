import React from 'react';

import CheckoutItem from './CheckoutItem/CheckoutItem';

const checkoutItems = (props) => {
    let items = props.cart.items;

    return (
        <div className="checkout__items w-full lg:w-2/3">
            {
                items.map( (item, i) => (
                    <CheckoutItem
                        key={i}
                        item={item}
                        updateQuantity={props.updateQuantity}
                        addQuantity={() => props.addQuantity(i)}
                        removeQuantity={() => props.removeQuantity(i)}
                        blur={props.blur}
                    />
                ))
            }
        </div>
    );
};

export default checkoutItems;
