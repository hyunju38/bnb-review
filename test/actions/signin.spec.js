
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import signin from '../../clients/src/actions/signin';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:3000';

describe('signin actions', () => {
    
    const initState = {
        status: null,
        response: {}
    };

    it('should create SIGNIN action', (done) => {

        nock(API_SERVER_URL)
            .post('/signin', {
                username: 'test',
                password: 'test'
            })
            .reply(201, {
                status: 'SUCCESS',
                results: ['some products']
            });

        const expectedAction = [
            {
                type: 'SIGNIN',
                status: null
            },
            {
                type: 'SIGNIN',
                status: 'SUCCESS',
                results: ['some products']
            }
        ];

        const store = mockStore(initState, expectedAction, done);
        store.dispatch(signin('test', 'test'));

    });

    it('should create SIGNIN action with an error', (done) => {
        nock(API_SERVER_URL)
            .post('/signin', {
                username: 'test',
                password: 'test'
            })
            .replyWithError('something awful happened');

        const expectedAction = [
            {
                type: 'SIGNIN',
                status: null
            },
            {
                type: 'SIGNIN',
                status: 'ERROR'
            }
        ];
        
        const store = mockStore(initState, expectedAction, done);
        store.dispatch(signin('test', 'test'));
    });

});
