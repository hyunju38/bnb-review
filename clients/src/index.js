import React from 'react';
import ReactDOM from 'react-dom';

import ProductInfo from './components/ProductInfo';
import ReviewList from './components/ReviewList';

const selectedProduct = {
    _id: 1,
    name: 'askfj;l',
    desc: ';alsdknv;laknev;lak',
    reviews: [
        {
            _id: 1,
            comment: 'sa;lekj',
            score: 4,
            user_id: 1
        },
        {
            _id: 2,
            comment: 'as;ljlekn',
            score: 2,
            user_id: 1
        }
    ]
};

ReactDOM.render(
    <div>
        <ProductInfo {...selectedProduct} />
        <ReviewList reviews={selectedProduct.reviews} />
    </div>,
    document.getElementById('root')
);
