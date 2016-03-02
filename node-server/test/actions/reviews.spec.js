import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import reviews from '../../public/js/actions/reviews';
import * as ActionsType from '../../public/js/actions/ActionsCreator';
import * as Constants from '../../public/js/constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Async reviews actions', () => {

    it('should create an action when It request to add review', (done) => {

        const reviewData = {
            comment: 'some comment',
            score: 2,
            product_id: 3,
            user_id: 4
        };

        nock(Constants.API_SERVER_URL)
        	.post('/reviews')
        	.reply(200, {
                data: {
                    _id: 1,
                    comment: 'some comment',
                    score: 2,
                    product_id: 3,
                    user_id: 4
                }
	        });

        const expectedActions = [
            {
                type: ActionsType.ADD_REVIEW
            },
            {
                type: ActionsType.ADD_REVIEW,
                status: Constants.SUCCESS,
                response: {
                    _id: 1,
                    comment: 'some comment',
                    score: 2,
                    product_id: 3,
                    user_id: 4
                }
            }
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(reviews('POST', reviewData));
    });
});
