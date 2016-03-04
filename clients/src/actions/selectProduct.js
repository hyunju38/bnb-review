import $ from 'jquery';

const API_SERVER_URL = 'http://localhost:3000';

const selectProduct = (id) => {
    return dispatch => {
        dispatch({
            type: 'SELECT_PRODUCT'
        });

        const st = $('.test');

        $.ajax(`${API_SERVER_URL}/products/${id}`, {
            type: 'GET',
            dataType: 'json',
            success (response) {
                dispatch({
                    type: 'SELECT_PRODUCT',
                    status: 'SUCCESS',
                    product: response.data
                });
            },
            error (error) {
                dispatch({
                    type: 'SELECT_PRODUCT',
                    status: 'ERROR'
                });
            },
            constentType: 'application/json'
        });
    };
};

export default selectProduct;
