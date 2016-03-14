const initState = {
    status: null,
    response: {
        paginator: {
            curPage: 1,
            totalPage: 1,
            size: 5,
            itemCount: 0
        },
        items: []
    }
};

const paginator = (state = initState.response.paginator, action) => {
     switch (action.type) {
        // case 'SELECT_PRODUCT':
        //     return action.product.reviews.paginator;
        case 'ADD_REVIEW':
            return Object.assign({}, state, {
                totalPage: Math.ceil(state.itemCount + 1 / state.size),
                itemCount: state.itemCount + 1
            });
        default:
            return state;
    }    
};

const items = (state = initState.response.items, action) => {
    switch (action.type) {
        // case 'SELECT_PRODUCT':
        //     return action.product.reviews.items;
        case 'ADD_REVIEW':
            return [
                ...state,
                action.review
            ];
        default:
            return state;
    }    
};

const response = (state = initState.response, action) => {
    switch (action.type) {
        // case 'SELECT_PRODUCT':
        case 'ADD_REVIEW':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return Object.assign({}, state, {
                paginator: paginator(state.paginator, action),
                items: items(state.items, action)
            });
        default:
            return state;
    }
};

const reviews = (state = initState, action) => {
    switch (action.type) {
        // case 'SELECT_PRODUCT':
        case 'ADD_REVIEW':
            return Object.assign({}, state, {
                status: action.status,
                response: response(state.response, action)
            });
        default:
            return state;
    }
};

export default reviews;
