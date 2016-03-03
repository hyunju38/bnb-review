import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import * as ActionsType from '../../public/js/actions/ActionsCreator';
import * as Constants from '../../public/js/constants';
import reviews from '../../public/js/reducers/reviews';

describe('Review reducer', () => {

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
