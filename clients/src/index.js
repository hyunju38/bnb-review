import React from 'react';
import ReactDOM from 'react-dom';

import ProductInfo from './components/ProductInfo';
import './main.scss';

const props = {
    selectedProduct: {
        name: '룰루랄라',
        desc: '아이후헤호하히하후호힝라두팓'
    }
};

ReactDOM.render(
    <ProductInfo {...props} />,
    document.getElementById('root')
);
