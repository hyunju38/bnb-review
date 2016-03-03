import React from 'react';

const DISPLAY_NAME = 'PRODUCT_INFO';

const ProductInfo = ({
    selectedProduct
}) => {
    return (
        <div>
            <h1>{selectedProduct.name}</h1>
            <p>
                {selectedProduct.desc}
            </p>
        </div>
    );
};

ProductInfo.displayName = DISPLAY_NAME;

export default ProductInfo;
