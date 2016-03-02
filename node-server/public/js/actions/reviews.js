import $ from 'jquery';
import * as constants from '../constants';

const reviews = (method = 'GET') => {
    return dispatch => {
        if (method === 'POST') {
            dispatch({
                type: `REQUEST_ADD_REVIEW`
            });
            $.post(`${constants.API_SERVER_URL}/reviews`, {
                test: 'test'
            })
            .then(response => {
                const { _id, comment, score, product_id, user_id } = JSON.parse(response);
                dispatch({
                    type: `RECIEVE_ADD_REVIEW`,
                    _id, comment, score, product_id, user_id
                });
            })
            .fail(error => {
                console.log('error', error);
                dispatch({
                    type: `RECIEVE_ADD_REVIEW_ERROR`
                });
            });
        }
    }
}

export default reviews;
