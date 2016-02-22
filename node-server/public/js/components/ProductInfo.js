import React from 'react';

const ProductInfo = ({
    selectedProduct
}) => {
    return(
        <div>
            <img />
            <h1>{`${selectedProduct.name}`}</h1>
            <p>{`${selectedProduct.desc}`}</p>
        </div>
    );
};

export default ProductInfo;
