import React from 'react';
import { NavLink } from 'react-router-dom';

const checkoutSummary = (props) => {
    return (
        <div className="checkout__summary w-full p-8 lg:p-0 lg:w-1/3 lg:ml-24">
            <h5 className="pb-4">Order Summary</h5>
            <div className="summary-table">
                <div className="summary-table__row summary-table__price flex justify-between items-center">
                    <label>Subtotal:</label>
                    <span>${props.cart.totalPrice.toFixed(2)}</span>
                </div>
            </div>
            <div className="summary-table__actions mt-8">
                <button
                    className="button button--blue w-full"
                    onClick={props.placeOrder}>
                    Place Order
                </button>
                <NavLink className="button button--stroke button--slate mt-8 w-full" to='/' exact>
                    Continue Shopping
                </NavLink>

            </div>
        </div>
    );
};

export default checkoutSummary;
