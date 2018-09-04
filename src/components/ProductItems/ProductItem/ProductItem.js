import React from 'react';

const productItem = (props) => {
    let product = null;

    return (
        <div className="products__item w-1/2 lg:w-1/3 px-2 lg:px-4 mb-6 lg:mb-12">
            <a href="#">
                <div className="products__img-container image-cover">
                    <img src={require('../../../assets/images/cobalt-shirt.jpg')} alt="Cobalt T-shirt" className="products__img" />
                </div>
                <div className="products__name mt-4">
                    <h5>Cobalt SS</h5>
                </div>
                <div className="products__price mt-2">
                    <p>$14.95</p>
                </div>
            </a>
        </div>
    );
};

export default productItem;
