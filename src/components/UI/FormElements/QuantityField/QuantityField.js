import React from 'react';

const quantityField = (props) => {
    return (
        <div className="quantity-control mb-8 lg:mb-12">
            <div className="quantity-control__widget flex">
                <button
                    className="quantity-control__button"
                    onClick={props.removeQuantity}>-</button>
                <input
                    id="quantity-control__counter"
                    className="quantity-control__counter"
                    type="text"
                    name="quantity"
                    value={props.value}
                    onChange={props.change}
                    onBlur={props.blur}/>
                <button
                    className="quantity-control__button"
                    onClick={props.addQuantity}>+</button>
            </div>
        </div>
    );
};

export default quantityField;
