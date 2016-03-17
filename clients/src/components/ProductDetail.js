import React from 'react';

const DISPLAY_NAME = 'PRODUCT_DETAIL';

const ProductDetail = ({
    name, desc
}) => {
    return(
        <div className="product-info">
            <h1>{name}</h1>
            <p>{desc}</p>
        </div>
    );
};
ProductDetail.displayName = DISPLAY_NAME;

export default ProductDetail;
