
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import fetchProductList from '../../clients/src/actions/fetchProductList';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:3000';

describe('fetchProductList actions', () => {
    
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

    it('should create FETCH_PRODUCT_LIST action', (done) => {

        nock(API_SERVER_URL)
            .get(/products/)
            .reply(200, {
                status: 'SUCCESS',
                data: ['some products']
            });

        const expectedAction = [
            {
                type: 'FETCH_PRODUCT_LIST',
                status: null
            },
            {
                type: 'FETCH_PRODUCT_LIST',
                status: 'SUCCESS',
                products: ['some products']
            }
        ];

        const store = mockStore(initState, expectedAction, done);
        store.dispatch(fetchProductList());
        
    });

    it('should create FETCH_PRODUCT_LIST action with error', (done) => {
        nock(API_SERVER_URL)
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
