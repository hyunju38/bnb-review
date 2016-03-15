import { combineReducers } from 'redux';

import products from './products';
import reviews from './reviews';
import user from './user';
import selectedProduct from './selectedProduct';

const root = combineReducers({
    products,
    reviews,
    selectedProduct,
    user
});

export default root;
