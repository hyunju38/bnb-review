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
                itemCount: 0
            },
            items: []
        }
    }
};

const results = (state = initState.results, action) => {
    switch (action.type) {
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
            return Object.assign({}, state, {
                status: action.status,
                results: results(state.results, action)
            });
        case 'SELECT_PRODUCT':
            return Object.assign({}, state, {
                status: action.status,
                results: results(state.results, action)
            });
        case 'SIGNOUT':
            return initState;
        default:
            return state;
    }
};

export default selectedProduct;
