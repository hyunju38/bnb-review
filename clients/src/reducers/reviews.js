const initState = {
    status: null,
    results: {
        paginator: {
            curPage: 1,
            totalPage: 1,
            size: 5,
            itemCount: 0
        },
        items: []
    }
};

const paginator = (state = initState.results.paginator, action) => {
     switch (action.type) {
        case 'ADD_REVIEW':
            return Object.assign({}, state, {
                totalPage: Math.ceil(state.itemCount + 1 / state.size),
                itemCount: state.itemCount + 1
            });
        default:
            return state;
    }    
};

const items = (state = initState.results.items, action) => {
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

const results = (state = initState.results, action) => {
    switch (action.type) {
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
        case 'ADD_REVIEW':
            return Object.assign({}, state, {
                status: action.status,
                results: results(state.results, action)
            });
        default:
            return state;
    }
};

export default reviews;
