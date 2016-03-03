import $ from 'jquery';
import * as ActionsType from '../actions/ActionsCreator';
import * as Constants from '../constants';

const reviews = (method = 'GET', review = {}) => {
    const defaultReview = {
        comment: '',
        score: 0
    };
    const mergedReview = Object.assign({}, defaultReview, review);
    return dispatch => {
        if (method === 'POST') {
            dispatch({
                type: ActionsType.ADD_REVIEW
            });

            $.ajax(`${Constants.API_SERVER_URL}/reviews`, {
                type: 'POST',
                data: mergedReview,
                dataType: 'json',
                success (response) {
                    // const { _id, comment, score, product_id, user_id } = response.data;
                    dispatch({
                        type: ActionsType.ADD_REVIEW,
                        status: Constants.SUCCESS,
                        response: response.data
                    });
                },
                error (error) {
                    dispatch({
                        type: ActionsType.ADD_REVIEW,
                        status: Constants.ERROR
                    });
                },
                contentType: 'application/json'
            });

            // $.post(`${Constants.API_SERVER_URL}/reviews`,
            //     mergedReview,
            //     (response) => {
            //         console.log('response', response);
            //         const { _id, comment, score, product_id, user_id } = response.data;
            //         dispatch({
            //             type: 'RECIEVE_ADD_REVIEW',
            //             _id, comment, score, product_id, user_id
            //         });
            //     },
            //     "json"
            // ).fail(error => {
            //     console.log('error', error);
            //     dispatch({
            //         type: 'RECIEVE_ADD_REVIEW_ERROR'
            //     });
            // });
        }
    }
}

export default reviews;
