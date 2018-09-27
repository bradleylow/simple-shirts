import React from 'react';

import QuantityField from '../../../UI/FormElements/QuantityField/QuantityField';

const checkoutItem = (props) => {
    let itemTotalPrice = props.item.price * props.item.quantity;

    return (
        <div className="checkout__item flex p-8 mb-8">
            <div className="checkout__item-img w-2/5 image-cover">
                <img src={require('../../../../assets/images/' + props.item.image)} alt=""/>
            </div>
            <div className="checkout__item-info w-3/5 ml-12">
                <h4>{props.item.name}</h4>
                <div className="item-attr flex flex-wrap lg:flex-row">
                    <div className="item-attr__base-price">
                        <label className="item-attr__label">Price</label>
                        <h5>${props.item.price}</h5>
                    </div>
                    <div className="item-attr__size">
                        <label className="item-attr__label">Size</label>
                        <h5>{props.item.size}</h5>
                    </div>
                    <div className="item-attr__quantity">
                        <label className="item-attr__label">Qty</label>
                        {/* <h5 onClick={props.updateQuantity}>{props.item.quantity}</h5> */}
                        <QuantityField
                            value={props.item.quantity}
                            removeQuantity={props.removeQuantity}
                            addQuantity={props.addQuantity}
                            change={props.updateQuantity}
                            blur={props.blur}
                        />
                    </div>
                    <div className="item-attr__totalPrice">
                        <label className="item-attr__label">Total</label>
                        <h5>${itemTotalPrice.toFixed(2)}</h5>
                    </div>
                    <div className="item-attr__actions self-end">
                        <span className="remove-item" onClick={props.removeItem}>Remove</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default checkoutItem;
