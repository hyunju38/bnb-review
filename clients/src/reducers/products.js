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
        case 'FETCH_PRODUCT_LIST':
            return action.products.paginator;
        default:
            return state;
    }
}

const items = (state = initState.response.items, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_LIST':
            return action.products.items;
        default:
            return state;
    }
};

const response = (state = initState.response, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_LIST':
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

const products = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCT_LIST':
            return Object.assign({}, state, {
                status: action.status,
                response: response(state.response, action)
            });
        default:
            return state;
    }
};

export default products; 