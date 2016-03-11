import { combineReducers } from 'redux';

import products from './products';
import reviews from './reviews';
import selectedProduct from './selectedProduct';

const root = combineReducers({
    products,
    reviews,
    selectedProduct
});

export default root;
