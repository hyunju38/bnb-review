import * as ActionsType from '../actions/ActionsCreator';

const review = (state = {}, action) => {
    let reviewsIndex = -1;
    switch (action.type) {
        case 'RECIEVE_ADD_REVIEW':
            return {
                _id: action._id,
                comment: action.comment,
                score: action.score,
                product_id: action.product_id,
                user_id: action.user_id
            };
        case ActionsType.ADD_REVIEW:
            return {
                _id: action._id,
                comment: action.comment,
                score: action.score,
                product_id: action.product_id,
                user_id: action.user_id
            };
        case ActionsType.UPDATE_REVIEW:
            return Object.assign({}, state, {
                comment: action.comment,
                score: action.score
            });
        default:
            return state;
    }
};

const reviews = (state = [], action) => {
    let reviewsIndex = -1;
    switch (action.type) {
        case 'REQUEST_ADD_REVIEW':
            return state;
        case 'RECIEVE_ADD_REVIEW':
            return [
                ...state,
                review(null, action)
            ];
        case 'RECIEVE_ADD_REVIEW_ERROR':
            return state;
        case ActionsType.ADD_REVIEW:
            return [
                ...state,
                review(null, action)
            ];
        case ActionsType.UPDATE_REVIEW:
            reviewsIndex = -1;
            state.forEach((review, index) => {
                if (review._id === action.id) {
                    reviewsIndex = index;
                }
            });

            if (reviewsIndex < 0) {
                return state;
            }

            return [
                ...state.slice(0, reviewsIndex),
                review(state[reviewsIndex], action),
                ...state.slice(reviewsIndex + 1)
            ];
        case ActionsType.REMOVE_REVIEW:
            return state.filter((review) => {
                return review._id !== action.id
            });
        default:
            return state;
    }
};

export default reviews;
