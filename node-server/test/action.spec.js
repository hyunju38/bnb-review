import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as constants from '../public/js/constants';
import {
    SELECTED_PRODUCT, SET_KEYWORD, ADD_REVIEW, UPDATE_REVIEW, REMOVE_REVIEW,
    REQUEST_PRODUCTS, RECIEVE_PRODUCTS, RECIEVE_ERROR,
    selectedProduct, setKeyword, addReview, removeReview
} from '../public/js/actions/ActionsCreator';
import products, { fetchTodos } from '../public/js/actions/products';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create an action if a response is successful', (done) => {
        nock(constants.API_SERVER_URL)
            .get('/products')
            .reply(200, {
                data: ['do something']
            });

        const expectedActions = [
            {
                type: 'REQUEST_PRODUCTS'
            },
            {
                type: 'RECIEVE_PRODUCTS',
                products: ['do something']
            }
        ];

        const store = mockStore({ products: [] }, expectedActions, done);
        store.dispatch(products());
    });

    it('should create an error action if a response is an error', (done) => {
        nock(constants.API_SERVER_URL)
            .get('/products')
            .replyWithError('something awful happened');

        const expectedActions = [
            { type: 'REQUEST_PRODUCTS' },
            { type: 'RECIEVE_ERROR' }
        ];

        const store = mockStore({ products: [] }, expectedActions, done);
        store.dispatch(products());
    });
});

describe('Actions', () => {

    it('should create an action to remove a review', () => {
        const id = 1;
        const expectedAction = {
            type: REMOVE_REVIEW,
            id
        };

        expect(removeReview(id))
            .to.be.deep.equal(expectedAction);
    });

    it('should create an action to add a review', () => {
        const review = {
            comment: '괜찮아요~',
            score: 3,
            product_id: 1,
            user_id: 1
        };
        const expectedAction = Object.assign({}, review, {
            type: ADD_REVIEW
        });

        expect(addReview(
            review.comment, review.score, review.product_id, review.user_id
        )).to.be.deep.equal(expectedAction);
    });

    it('should create an action to set a keyword', () => {
        const keyword = 'test';
        const expectedAction = {
            type: SET_KEYWORD,
            keyword
        };

        expect(setKeyword(keyword))
            .to.be.deep.equal(expectedAction);
    });

    it('should create an action to select a product', () => {
        const id = 1;
        const expectedAction = {
            type: SELECTED_PRODUCT,
            id
        };

        expect(selectedProduct(id))
            .to.be.deep.equal(expectedAction);
    });
});
