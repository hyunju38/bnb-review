import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import ProductInfo from './components/ProductInfo';

// import './main.scss';

const props = {
    selectedProduct: {
        name: "샘플 펜션..",
        desc: "산 좋고, 물 좋고, 공기 좋고~"
    }
};

ReactDOM.render(
    <div>
        <ProductInfo { ...props } />
    </div>,
    document.getElementById('root')
);
