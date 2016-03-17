import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import nock from 'nock';

import addReview from '../../clients/src/actions/addReview';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:3000';

describe('addReview actions', () => {

    const testToken = jwt.sign({ 
        username: 'test', 
        password: 'test'
    }, 'test');
    
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

    it('should create ADD_REVIEW action', (done) => {
        
        window.sessionStorage.setItem('token', testToken);
        
        nock(API_SERVER_URL, {
                reqheaders: {
                    'Authorization': `Bearer ${testToken}`
                }
            })
            .post('/reviews', {
                score: 3,
                comment: 'test',
                product_id: 1,
                user_id: 1
            })
            .reply(201, {
                status: 'SUCCESS',
                results: ['some review']
            });

        const expectedAction = [
            {
                type: 'ADD_REVIEW',
                status: null
            },
            {
                type: 'ADD_REVIEW',
                status: 'SUCCESS',
                results: ['some review']
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
