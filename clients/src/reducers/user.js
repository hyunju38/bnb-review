const initState = {
    status: null,
    results: {}
};

const user = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNIN':
            if (action.status !== 'SUCCESS') {
                return Object.assign({}, state, {
                    status: action.status
                });
            }
            return Object.assign({}, state, {
                status: action.status,
                results: action.results
            });
        case 'SIGNOUT':
            return {
                status: action.status,
                results: {}
            };
        default:
            return state;
    }
};

export default user;
