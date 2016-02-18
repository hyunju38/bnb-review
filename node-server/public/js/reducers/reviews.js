const review = (state = {}, action) => {
    let reviewsIndex = -1;
    switch (action.type) {
        case 'ADD_REVIEW':
            return {
                _id: action._id,
                comment: action.comment,
                score: action.score,
                user_id: action.user_id
            };
        case 'UPDATE_REVIEW':
            return Object.assign({}, state, {
                comment: action.comment,
                score: action.score
            });
        default:
            return state;
    }
};

const reviews = (state = [], action) => {
    let reviewsIndex = -1;
    switch (action.type) {
        case 'ADD_REVIEW':
            const maxId = state.reduce((prev, cur) => {
                return Math.max(prev, cur._id);
            }, 0) + 1;

            return [
                ...state,
                review(null, Object.assign({}, action, {_id: maxId}))
            ];
        case 'UPDATE_REVIEW':
            reviewsIndex = -1;
            state.forEach((review, index) => {
                if (review._id === action.id) {
                    reviewsIndex = index;
                }
            });

            if (reviewsIndex < 0) {
                return state;
            }

            return [
                ...state.slice(0, reviewsIndex),
                review(state[reviewsIndex], action),
                ...state.slice(reviewsIndex + 1)
            ];
        case 'REMOVE_REVIEW':
            reviewsIndex = -1;
            state.forEach((review, index) => {
                if (review._id === action.id) {
                    reviewsIndex = index;
                }
            });

            if (reviewsIndex < 0) {
                return state;
            }

            return [
                ...state.slice(0, reviewsIndex),
                ...state.slice(reviewsIndex + 1)
            ];
        default:
            return state;
    }
};

const keyword = (state = [], action) => {
    switch (action.type) {
        case 'SET_KEYWORD':
            return action.keyword;
        default:
            return state;
    }
};

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                );
                return nextState;
            },
            {}
        );
    };
};

const reviewApp = combineReducers({
    reviews,
    keyword
});

export default reviewApp;
