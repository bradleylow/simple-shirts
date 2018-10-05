import React from 'react';

import OrderItem from './OrderItem/OrderItem';

const orderItems = (props) => {
    return (
        <div className="orders">
            {props.orders.map( (order, i) => (
                <OrderItem key={i} order={order} />
            ))}
        </div>
    );
};

export default orderItems;
