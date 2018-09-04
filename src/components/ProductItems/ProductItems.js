import React from 'react';

import ProductItem from './ProductItem/ProductItem';

const productItems = (props) => {
    return (
        <div className="products flex flex-wrap px-2 lg:px-0 lg:-mx-4">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
        </div>
    );
};

export default productItems;
