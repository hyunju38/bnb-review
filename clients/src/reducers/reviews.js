const initState = {
    response: []
};

const reviews = (state = [], action) => {
    switch (action.type) {
        case 'SELECT_PRODUCT':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return action.product.reviews;
        case 'ADD_REVIEW':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return [
                ...state,
                action.response
            ];
        default:
            return state;
    }
}

const roots = (state = initState, action) => {
    let statusObj;
    switch (action.type) {
        case 'SELECT_PRODUCT':
            statusObj = typeof action.status !== 'undefined' ?
                        { status: action.status } :
                        {};
            return Object.assign({}, state, { response: reviews(state.response, action) }, statusObj);
        case 'ADD_REVIEW':
            statusObj = typeof action.status !== 'undefined' ?
                        { status: action.status } :
                        {};
            return Object.assign({}, state, { response: reviews(state.response, action) }, statusObj);
        default:
            return state;
    }
};

export default roots;
