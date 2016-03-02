import { combineReducers } from 'redux';

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

const paginate = (state = {}, action) => {
    switch (action.type) {
        case ActionsType.RECIEVE_PRODUCTS:
            return action.paginate;
        default:
            return state;
    }
};

const products = (state = [], action) => {
    switch (action.type) {
        case ActionsType.RECIEVE_PRODUCTS:
            return action.products;
        case ActionsType.RECIEVE_ERROR:
            // throw error...
            return state;
        case ActionsType.ADD_REVIEW:
            const maxId = state.reduce((prevMaxId, curProduct) => {
                const maxReviewId = curProduct.reviews
                                    .reduce((prevReviewId, curReview) => {
                                        return Math.max(prevReviewId, curReview._id);
                                    }, 0);
                return Math.max(prevMaxId, maxReviewId);
            }, 0) + 1;
            action._id = maxId;

            return state.map(product => {
                if (action.product_id === product._id) {
                    return Object.assign({}, product, {
                        reviews: reviews(product.reviews, action)
                    });
                }
                return product;
            });
        case ActionsType.UPDATE_REVIEW:
        case ActionsType.REMOVE_REVIEW:
            return state.map((product) => {
                return Object.assign({}, product, {
                    reviews: reviews(product.reviews, action)
                });
            });
        default:
            return state;
    }
};

const keyword = (state = '', action) => {
    switch (action.type) {
        case 'SET_KEYWORD':
            return action.keyword;
        default:
            return state;
    }
};

const selectedProductId = (state = '', action) => {
    switch (action.type) {
        case 'SELECTED_PRODUCT':
            return action.id;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case ActionsType.REQUEST_PRODUCTS:
            return true;
        case ActionsType.RECIEVE_PRODUCTS:
        case ActionsType.RECIEVE_ERROR:
            return false;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    keyword,
    paginate,
    products,
    selectedProductId,
    isFetching
});

export default rootReducer;
