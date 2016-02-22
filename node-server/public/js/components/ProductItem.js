import React from 'react';

const ProductItem = ({
    onClick,
    product
}) => {
    return(
        <li data-id={product._id}>
            <a href="#" onClick={onClick}>
                {`펜션 이름: ${product.name}, 리뷰 개수: ${product.reviews.length}`}
            </a>
        </li>
    );
};

export default ProductItem;
