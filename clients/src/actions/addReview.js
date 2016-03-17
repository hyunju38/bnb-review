import fetch from 'isomorphic-fetch';

const API_SERVER_URL = process.env.NODE_ENV === 'test' ?
                         'http://localhost:3000/reviews' :
                         '/reviews';

const addReview = (reviewData = {}, options = {}) => {
    return dispatch => {
        dispatch({
            type: 'ADD_REVIEW',
            status: null
        });
        
        const token = window.sessionStorage.getItem('token');
        
        const requriedOptions = {
            method: 'POST',
            body: JSON.stringify(reviewData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        
        const mergedOptions = Object.assign({}, options, requriedOptions);
        
        return fetch(API_SERVER_URL, mergedOptions)
            .then(response => response.json())
            .then(json => dispatch({
                type: 'ADD_REVIEW',
                status: 'SUCCESS',
                results: json.results
            }))
            .catch(error => dispatch({
                type: 'ADD_REVIEW',
                status: 'ERROR'
            }));

    }
};

export default addReview;