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
        
        return fetch(`${API_SERVER_URL}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(json => dispatch({
                type: 'FETCH_PRODUCT_LIST',
                status: 'SUCCESS',
                products: json.data 
            }))
            .catch(error => dispatch({
                type: 'FETCH_PRODUCT_LIST',
                status: 'ERROR'
            }));
    }
};

export default fetchProductList;