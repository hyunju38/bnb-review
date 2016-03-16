const initState = {
    status: null,
    results: {
        name: '',
        desc: '',
        reviews: {
            paginator: {
                curPage: 1,
                totalPage: 1,
                size: 5,
                totalItem: 0
            },
            items: []
        }
    }
};

const paginator = (state = initState.results.reviews.paginator, action) => {
     switch (action.type) {
        case 'ADD_REVIEW':
            return Object.assign({}, state, {
                totalPage: Math.ceil(state.totalItem + 1 / state.size),
                itemCount: state.totalItem + 1
            });
        default:
            return state;
    }    
};

const items = (state = initState.results.reviews.items, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            return [
                ...state,
                action.review
            ];
        default:
            return state;
    }
};

const reviews = (state = initState.results.reviews, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            return Object.assign({}, state, {
                paginator: paginator(state.paginator, action),
                items: items(state.items, action)
            });
        default:
            return state;
    }
};

const results = (state = initState.results, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return Object.assign({}, state, {
                reviews: reviews(state.paginator.reviews, action)
            });
        case 'SELECT_PRODUCT':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return action.results;
        default:
            return state;
    } 
};

const selectedProduct = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
        case 'SELECT_PRODUCT':
            return Object.assign({}, state, {
                status: action.status,
                results: results(initState.results, action)
            });
        default:
            return state;
    }
};

export default selectedProduct;
