import fetch from 'isomorphic-fetch';

const API_SERVER_URL = process.env.NODE_ENV === 'test' ?
                        'http://localhost:3000/products' :
                        '/products';

const fetchProductList = (page) => {
    return dispatch => {
        dispatch({
            type: 'FETCH_PRODUCT_LIST',
            status: null
        });
        
        const token = window.sessionStorage.getItem('token');
        
        // template string don't work.. 
        return fetch(`${API_SERVER_URL}?page=${page}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(json => dispatch({
                type: 'FETCH_PRODUCT_LIST',
                status: 'SUCCESS',
                results: json.results
            }))
            .catch(error => dispatch({
                type: 'FETCH_PRODUCT_LIST',
                status: 'ERROR'
            }));
    }
};

export default fetchProductList;