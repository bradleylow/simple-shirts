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
                        updateQuantity={(e) => props.updateQuantity(i, e)}
                        addQuantity={() => props.addQuantity(i)}
                        removeQuantity={() => props.removeQuantity(i)}
                        blur={(e) => props.blur(i, e)}
                        removeItem={() => props.removeItem(i)}
                    />
                ))
            }
        </div>
    );
};

export default checkoutItems;
