const initState = {
    status: undefined,
    response: {
        paginator: {
            curPage: 1,
            totalPage: 1
        },
        items: []
    }
};

const paginator = (state = initState.response.paginator, action) => {
     switch (action.type) {
        case 'SELECT_PRODUCT':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return action.product.reviews.paginator;
        default:
            return state;
    }    
};

const items = (state = initState.response.items, action) => {
    switch (action.type) {
        case 'SELECT_PRODUCT':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return action.product.reviews.items;
        default:
            return state;
    }    
};

const response = (state = initState.response, action) => {
    switch (action.type) {
        case 'SELECT_PRODUCT':
            if (action.status !== 'SUCCESS') {
                return state;
            }
            return Object.assign({}, state, {
                paginator: paginator(state.paginator, action),
                items: items(state.items, action)
            });
        // case 'ADD_REVIEW':
        //     if (action.status !== 'SUCCESS') {
        //         return state;
        //     }
        //     return Object.assign({}, state, {
        //         paginator: paginator(state.paginator, action),
        //         items: items(state.items, action)
        //     })
        default:
            return state;
    }
};

const reviews = (state = initState, action) => {
    let statusObj;
    switch (action.type) {
        case 'SELECT_PRODUCT':
            // statusObj = typeof action.status !== 'undefined' ?
            //             { status: action.status } :
            //             {};
            return Object.assign({}, state, {
                status: action.status,
                response: response(state.response, action)
            });
        // case 'ADD_REVIEW':
        //     statusObj = typeof action.status !== 'undefined' ?
        //                 { status: action.status } :
        //                 {};
        //     return Object.assign({}, state, { response: response(state.response, action) }, statusObj);
        default:
            return state;
    }
};

export default reviews;
