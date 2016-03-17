import { combineReducers } from 'redux';

import products from './products';
import selectedProduct from './selectedProduct';
import user from './user';

const root = combineReducers({
    products,
    selectedProduct,
    user
});

export default root;
