import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import reviews from '../../public/js/actions/reviews';
import * as constants from '../../public/js/constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Async reviews actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action when It request to add review', (done) => {
        nock(constants.API_SERVER_URL)
            .post('/reviews', {
                test: 'test'
            })
            .reply(200, {
                _id: 1,
                comment: 'some comment',
                score: 2,
                product_id: 3,
                user_id: 4
            });

        const expectedActions = [
            {
                type: 'REQUEST_ADD_REVIEW'
            },
            {
                type: 'RECIEVE_ADD_REVIEW',
                _id: 1,
                comment: 'some comment',
                score: 2,
                product_id: 3,
                user_id: 4
            }
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(reviews('POST'));
    });
});
