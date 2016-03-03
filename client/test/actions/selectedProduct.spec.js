import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import selectedProduct from '../../src/actions/selectedProduct';
import * as ActionsType from '../../src/actions/ActionsCreator';
import * as Constants from '../../src/constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

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

        nock(Constants.API_SERVER_URL)
            .get(`/products/${productDummy._id}`)
            .reply(200, {
                data: productDummy
            });

        const expectedAction = [
            {
                type: ActionsType.SELECT_PRODUCT
            },
            {
                type: ActionsType.SELECT_PRODUCT,
                status: Constants.SUCCESS,
                product: productDummy
            }
        ];

        const store = mockStore({}, expectedAction, done);
        store.dispatch(selectedProduct(productDummy._id));

    });

    it('should create SELECT_PRODUCT with error status when getting product data has been fail', (done) => {

        nock(Constants.API_SERVER_URL)
            .get(`/products/${productDummy._id}`)
            .replyWithError('something awful happened');

        const expectedActions = [
            { type: ActionsType.SELECT_PRODUCT },
            {
                type: ActionsType.SELECT_PRODUCT,
                status: Constants.ERROR
            }
        ];

        const store = mockStore({}, expectedActions, done);
        store.dispatch(selectedProduct(productDummy._id));

    });

});
