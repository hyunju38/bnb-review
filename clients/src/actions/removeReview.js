import fetch from 'isomorphic-fetch';

const API_SERVER_URL = process.env.NODE_ENV === 'test' ?
                         'http://localhost:3000/reviews' :
                         '/reviews';

const removeReview = (reviewId) => {
    return dispatch => {
        dispatch({
            type: 'REMOVE_REVIEW',
            status: null
        });
        
        const token = window.sessionStorage.getItem('token');
        
        return fetch(`${API_SERVER_URL}/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(json => dispatch({
                type: 'REMOVE_REVIEW',
                status: 'SUCCESS',
                results: json.results
            }))
            .catch(error => dispatch({
                type: 'REMOVE_REVIEW',
                status: 'ERROR'
            }));

    }
};

export default removeReview;