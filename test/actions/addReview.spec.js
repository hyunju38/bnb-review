import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import addReview from '../../clients/src/actions/addReview';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:3000';

describe('addReview actions', () => {

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

    it('should create ADD_REVIEW action', (done) => {

        nock(API_SERVER_URL)
            .post('/reviews', {
                score: 3,
                comment: 'test',
                product_id: 1,
                user_id: 1
            })
            .reply(201, {
                status: 'SUCCESS',
                data: ['some review']
            });

        const expectedAction = [
            {
                type: 'ADD_REVIEW',
                status: null
            },
            {
                type: 'ADD_REVIEW',
                status: 'SUCCESS',
                review: ['some review']
            }
        ];

        const store = mockStore(initState, expectedAction, done);
        store.dispatch(addReview({
            score: 3,
            comment: 'test',
            product_id: 1,
            user_id: 1
        }));

    });

});
