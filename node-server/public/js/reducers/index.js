import { combineReducers } from 'redux';

import * as ActionsType from '../actions/ActionsCreator';
import reviews from './reviews';
import products from './products';


const paginate = (state = {}, action) => {
    switch (action.type) {
        case ActionsType.RECIEVE_PRODUCTS:
            return action.paginate;
        default:
            return state;
    }
};

const keyword = (state = '', action) => {
    switch (action.type) {
        case 'SET_KEYWORD':
            return action.keyword;
        default:
            return state;
    }
};

const selectedProductId = (state = '', action) => {
    switch (action.type) {
        case 'SELECTED_PRODUCT':
            return action.id;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case ActionsType.REQUEST_PRODUCTS:
            return true;
        case ActionsType.RECIEVE_PRODUCTS:
        case ActionsType.RECIEVE_ERROR:
            return false;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    keyword,
    paginate,
    products,
    selectedProductId,
    isFetching
});

export default rootReducer;
