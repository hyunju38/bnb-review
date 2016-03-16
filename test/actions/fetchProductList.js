
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import nock from 'nock';

import fetchProductList from '../../clients/src/actions/fetchProductList';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:3000';

describe('fetchProductList actions', () => {
    
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
                totalItem: 0
            },
            items: []
        }
    };

    it('should create FETCH_PRODUCT_LIST action', (done) => {
        
        window.sessionStorage.setItem('token', testToken);

        nock(API_SERVER_URL, {
                reqheaders: {
                    'Authorization': `Bearer ${testToken}`
                }
            })
            .get(/products/)
            .reply(200, {
                status: 'SUCCESS',
                results: ['some products']
            });

        const expectedAction = [
            {
                type: 'FETCH_PRODUCT_LIST',
                status: null
            },
            {
                type: 'FETCH_PRODUCT_LIST',
                status: 'SUCCESS',
                results: ['some products']
            }
        ];

        const store = mockStore(initState, expectedAction, done);
        store.dispatch(fetchProductList());
        
    });

    it('should create FETCH_PRODUCT_LIST action with error', (done) => {
        
        window.sessionStorage.setItem('token', testToken);
        
        nock(API_SERVER_URL, {
                reqheaders: {
                    'Authorization': `Bearer ${testToken}`
                }
            })
            .get('/products')
            .replyWithError('something awful happened');

        const expectedAction = [
            {
                type: 'FETCH_PRODUCT_LIST',
                status: null
            },
            {
                type: 'FETCH_PRODUCT_LIST',
                status: 'ERROR'
            }
        ];
        
        const store = mockStore(initState, expectedAction, done);
        store.dispatch(fetchProductList());
    });

});
