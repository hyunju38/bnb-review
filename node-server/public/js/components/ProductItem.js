import React from 'react';

const ProductItem = ({
    onClick,
    product
}) => {
    return(
        <a className="list-group-item"
            href="#"
            onClick={onClick}
            data-id={product._id}
        >
            { product.name }
            <span className="badge"
                onClick={(e) => {e.stopPropagation();}}
            >
                { product.reviews.length }
            </span>
        </a>
    );
};

export default ProductItem;
