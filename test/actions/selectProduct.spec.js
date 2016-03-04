import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import selectedProduct from '../../clients/src/actions/selectProduct';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

const API_SERVER_URL = 'http://localhost:8888';

describe('selectedProduct actions', () => {

    const productDummy = {
        '_id': 1,
        'name': '룰루랄라',
        'desc': '랄라라라라라라라라ㅏ라라랄라랄',
        'reviews': [
            {
                '_id': 1,
                'comment': 'something',
                'score': 2,
                'product_id': 3,
                'user_id': 4
            },
            {
                '_id': 2,
                'comment': 'some..',
                'score': 3,
                'product_id': 4,
                'user_id': 5
            }
        ]
    };

    it('should create SELECT_PRODUCT with product data when getting product data has been done', (done) => {

        nock(API_SERVER_URL)
            .get(`/products/${productDummy._id}`)
            .reply(200, {
                data: productDummy
            });

        const expectedAction = [
            {
                type: 'SELECT_PRODUCT'
            },
            {
                type: 'SELECT_PRODUCT',
                status: 'SUCCESS',
                product: productDummy
            }
        ];

        const store = mockStore({}, expectedAction, done);
        store.dispatch(selectedProduct(productDummy._id));

    });

    it('should create SELECT_PRODUCT with error status when getting product data has been fail', (done) => {

        nock(API_SERVER_URL)
            .get(`/products/${productDummy._id}`)
            .replyWithError('something awful happened');

        const expectedActions = [
            { type: 'SELECT_PRODUCT' },
            {
                type: 'SELECT_PRODUCT',
                status: 'ERROR'
            }
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(selectedProduct(productDummy._id));

    });

});
