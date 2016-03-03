import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import * as ActionsType from '../../src/actions/ActionsCreator';
import * as Constants from '../../src/constants';
import reviews from '../../src/reducers/reviews';

describe('Review reducer', () => {

    describe('SELECT_PRODUCT test code', () => {

        it ('should get reviews data', () => {

            const stateBefore = {
                response: []
            };

            const action = {
                type: ActionsType.SELECT_PRODUCT,
                status: Constants.SUCCESS,
                product: {
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
                }
            };

            const stateAfter = {
                status: Constants.SUCCESS,
                response: [
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

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should only set status if it have an error', () => {

            const stateBefore = {
                response: []
            };

            const action = {
                type: ActionsType.SELECT_PRODUCT,
                status: Constants.ERROR
            };

            const stateAfter = {
                status: Constants.ERROR,
                response: []
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should not modify if it just request', () => {

            const stateBefore = {
                response: []
            };

            const action = {
                type: ActionsType.SELECT_PRODUCT
            };

            const stateAfter = {
                response: []
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

    });

    describe('ADD_REVIEW test code', () => {

        it('should add review object to response', () => {
            // Request...
            const stateBefore = {
                response: []
            };

            const action = {
                type: ActionsType.ADD_REVIEW,
                status: Constants.SUCCESS,
                response: {
                    '_id': 1,
                    'comment': 'something',
                    'score': 2,
                    'product_id': 3,
                    'user_id': 4
                }
            };

            const stateAfter = {
                status: Constants.SUCCESS,
                response: [
                    {
                        '_id': 1,
                        'comment': 'something',
                        'score': 2,
                        'product_id': 3,
                        'user_id': 4
                    }
                ]
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);
        });

        it('should not modify if it is without action.status', () => {
            const stateBefore = {
                response: []
            };

            const action = {
                type: ActionsType.ADD_REVIEW
            };

            const stateAfter = {
                response: []
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);
        });

        it('should add status if you have an error', () => {
            const stateBefore = {
                response: []
            };

            const action = {
                type: ActionsType.ADD_REVIEW,
                status: Constants.ERROR
            };

            const stateAfter = {
                status: Constants.ERROR,
                response: []
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);
        });

    });

});
