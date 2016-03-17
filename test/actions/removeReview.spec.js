import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import nock from 'nock';

import removeReview from '../../clients/src/actions/removeReview';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:3000';

describe('removeReview actions', () => {

    const testToken = jwt.sign({ 
        username: 'test', 
        password: 'test'
    }, 'test');

    it('should create REMOVE_REVIEW action', (done) => {
        
        window.sessionStorage.setItem('token', testToken);
        
        nock(API_SERVER_URL, {
                reqheaders: {
                    'Authorization': `Bearer ${testToken}`
                }
            })
            .delete(/reviews/)
            .reply(201, {
                status: 'SUCCESS',
                results: ['some review']
            });

        const expectedAction = [
            {
                type: 'REMOVE_REVIEW',
                status: null
            },
            {
                type: 'REMOVE_REVIEW',
                status: 'SUCCESS',
                results: ['some review']
            }
        ];

        const store = mockStore({}, expectedAction, done);
        store.dispatch(removeReview('test'));

    });
    
    it('should create REMOVE_REVIEW action with error', (done) => {
        
        window.sessionStorage.setItem('token', testToken);
        
        nock(API_SERVER_URL, {
                reqheaders: {
                    'Authorization': `Bearer ${testToken}`
                }
            })
            .delete(/reviews/)
            .replyWithError('something awful happened');

        const expectedAction = [
            {
                type: 'REMOVE_REVIEW',
                status: null
            },
            {
                type: 'REMOVE_REVIEW',
                status: 'ERROR'
            }
        ];

        const store = mockStore({}, expectedAction, done);
        store.dispatch(removeReview('test'));

    });

});
