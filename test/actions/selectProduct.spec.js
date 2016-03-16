import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import nock from 'nock';

import selectProduct from '../../clients/src/actions/selectProduct';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:3000';

describe('selectProduct actions', () => {

    const testToken = jwt.sign({ 
        username: 'test', 
        password: 'test'
    }, 'test');

    it('should create SELECT_PRODUCT with product data when getting product data has been done', (done) => {

        window.sessionStorage.setItem('token', testToken);
        
        nock(API_SERVER_URL, {
                reqheaders: {
                    'Authorization': `Bearer ${testToken}`
                }
            })
            .get(/products/)
            .reply(200, {
                status: 'SUCCESS',
                results: ['some data']
            });

        const expectedAction = [
            {
                type: 'SELECT_PRODUCT',
                status: null
            },
            {
                type: 'SELECT_PRODUCT',
                status: 'SUCCESS',
                results: ['some data']
            }
        ];

        const store = mockStore({}, expectedAction, done);
        store.dispatch(selectProduct('56d94501ab9e222f7ada60e4'));

    });

    it('should create SELECT_PRODUCT with error status when getting product data has been fail', (done) => {

        window.sessionStorage.setItem('token', testToken);

        nock(API_SERVER_URL, {
                reqheaders: {
                    'Authorization': `Bearer ${testToken}`
                }
            })
            .get(/products/)
            .replyWithError('something awful happened');

        const expectedActions = [
            { 
                type: 'SELECT_PRODUCT',
                status: null 
            },
            {
                type: 'SELECT_PRODUCT',
                status: 'ERROR'
            }
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(selectProduct('56d94501ab9e222f7ada60e4'));

    });

});
