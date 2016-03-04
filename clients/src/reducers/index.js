import { combineReducers } from 'redux';

import reviews from './reviews';
import selectedProduct from './selectedProduct';

const root = combineReducers({
    reviews,
    selectedProduct
});

export default root;
