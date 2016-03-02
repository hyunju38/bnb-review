import * as ActionsType from '../actions/ActionsCreator';

const paginate = (state = {}, action) => {
    switch (action.type) {
        case ActionsType.RECIEVE_PRODUCTS:
            return action.paginate;
        default:
            return state;
    }
};

export default paginate;
