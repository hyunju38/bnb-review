import * as ActionsType from '../actions/ActionsCreator';

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

export default products;
