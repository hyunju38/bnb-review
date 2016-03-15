import fetch from 'isomorphic-fetch';

const API_SERVER_URL = 'http://localhost:3000';

const selectProduct = (id, options = {}) => {
    return dispatch => {
        dispatch({
            type: 'SELECT_PRODUCT',
            status: null
        });
        
        const modifiedOptions = Object.assign({}, {
            page: 1,
            size: 5
        }, options);

        return fetch(`${API_SERVER_URL}/products/${id}?page=${modifiedOptions.page}&size=${modifiedOptions.size}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(json => {
                return dispatch({
                type: 'SELECT_PRODUCT',
                status: 'SUCCESS',
                results: json.results
            })})
            .catch(error => dispatch({
                type: 'SELECT_PRODUCT',
                status: 'ERROR'
            }));
    };
};

export default selectProduct;
