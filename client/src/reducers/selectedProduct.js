import * as ActionsType from '../actions/ActionsCreator';
import * as Constants from '../constants';

const initState = {
    product: {}
};

const selectedProduct = (state = initState, action) => {
    switch (action.type) {
        case ActionsType.SELECT_PRODUCT:
            const statusObj = typeof action.status !== 'undefined' ?
                                { status: action.status } :
                                {};
            return Object.assign({}, state, { product: action.product || state.product }, statusObj);
        default:
            return state;
    }
};

export default selectedProduct;
