import React from 'react';

const DISPLAY_NAME = 'PRODUCT_INFO';

const ProductInfo = ({
    name, desc
}) => {
    return(
        <div className="product-info">
            <h1>{name}</h1>
            <p>{desc}</p>
        </div>
    );
};
ProductInfo.displayName = DISPLAY_NAME;

export default ProductInfo;
