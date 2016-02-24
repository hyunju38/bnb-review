const SELECTED_PRODUCT = 'SELECTED_PRODUCT', SET_KEYWORD = 'SET_KEYWORD',
    ADD_REVIEW = 'ADD_REVIEW', REMOVE_REVIEW = 'REMOVE_REVIEW', UPDATE_REVIEW = 'UPDATE_REVIEW',
    REQUEST_PRODUCTS = 'REQUEST_PRODUCTS', RECIEVE_PRODUCTS = 'RECIEVE_PRODUCTS',
    RECIEVE_ERROR = 'RECIEVE_ERROR';

const selectedProduct = (id) => {
    return {
        type: SELECTED_PRODUCT,
        id
    };
};

const setKeyword = (keyword) => {
    return {
        type: SET_KEYWORD,
        keyword
    };
};

const addReview = (comment, score, product_id, user_id) => {
    return {
        type: ADD_REVIEW,
        comment,
        score,
        product_id,
        user_id
    };
}

const removeReview = (id) => {
    return {
        type: 'REMOVE_REVIEW',
        id
    };
};

export {
    SELECTED_PRODUCT, SET_KEYWORD, ADD_REVIEW, UPDATE_REVIEW, REMOVE_REVIEW,
    REQUEST_PRODUCTS, RECIEVE_PRODUCTS, REQUEST_PRODUCTS,
    selectedProduct, setKeyword, addReview, removeReview
};
