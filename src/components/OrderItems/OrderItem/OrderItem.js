import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import Product from '../Product/Product';

const orderItem = (props) => {
    return (
        <div className="orders__item" data-id={props.order.id}>
            <div className="item__header flex flex-wrap lg:flex-no-wrap justify-between mb-8">
                <div className="item__header-section w-1/2 sm:w-1/3">
                    <label>Order ID:</label>
                    <h5>{props.order.id}</h5>
                </div>
                <div className="item__header-section w-1/2 sm:w-1/3">
                    <label>Date Placed:</label>
                    <h5>
                        <Moment format="MMM D Y" tz="America/Vancouver">
                            {props.order.datePlaced}
                        </Moment>
                    </h5>
                </div>
                <div className="item__header-section w-full sm:w-1/3 mt-2 sm:mt-0">
                    <label>Total:</label>
                    <h5>${props.order.orderData.totalPrice.toFixed(2)}</h5>
                </div>
            </div>
            <div className="item__body">
                <h5 className="item__body__heading">Items:</h5>
                <div className="item__products w-full flex flex-wrap py-4">
                    {props.order.orderData.items.map( (product, i) => (
                        <Product key={i} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default orderItem;
