import $ from 'jquery';

import * as ActionsType from './ActionsCreator';
import * as Constants from '../constants';

const selectedProduct = (id) => {
    return dispatch => {
        dispatch({
            type: ActionsType.SELECT_PRODUCT
        });

        const st = $('.test');

        $.ajax(`${Constants.API_SERVER_URL}/products/${id}`, {
            type: 'GET',
            dataType: 'json',
            success (response) {
                dispatch({
                    type: ActionsType.SELECT_PRODUCT,
                    status: Constants.SUCCESS,
                    product: response.data
                });
            },
            error (error) {
                dispatch({
                    type: ActionsType.SELECT_PRODUCT,
                    status: Constants.ERROR
                });
            },
            constentType: 'application/json'
        });
    };
};

export default selectedProduct;
