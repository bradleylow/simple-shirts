import React from 'react';

const checkoutItem = (props) => {
    return (
        <div className="checkout__item flex p-8 mb-8">
            <div className="checkout__item-img w-2/5 image-cover">
                <img src={require('../../../../assets/images/' + props.item.image)} alt=""/>
            </div>
            <div className="checkout__item-info w-3/5">
                <h4>{props.item.name}</h4>
                <div className="item-attr flex">
                    <div className="item-attr__base-price">
                        <h5>{props.item.price}</h5>
                    </div>
                    <div className="item-attr__size">
                        <h5>{props.item.size}</h5>
                    </div>
                    <div className="item-attr__quantity">
                        <h5></h5>
                    </div>
                    <div className="item-attr__totalPrice">
                        <h5></h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default checkoutItem;
