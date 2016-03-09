import $ from 'jquery';

const API_SERVER_URL = 'http://localhost:3000';

const selectProduct = (id, options = {}) => {
    return dispatch => {
        dispatch({
            type: 'SELECT_PRODUCT'
        });

        $.ajax(`${API_SERVER_URL}/products/${id}`, {
            type: 'GET',
            dataType: 'json',
            data: options,
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
