import React from 'react';

import ProductItem from './ProductItem/ProductItem';

const productItems = (props) => {
    return (
        <div className="products flex flex-wrap px-2 lg:px-0 lg:-mx-4">
            {props.products.map( (product, i) => (
                <ProductItem key={i} product={product} />
            ))}
        </div>
    );
};

export default productItems;
