import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import selectedProduct from '../../src/reducers/selectedProduct';
import * as ActionsType from '../../src/actions/ActionsCreator';
import * as Constants from '../../src/constants';

describe('SelectedProduct reducer', () => {

    describe('SELECT_PRODUCT test code', () => {

        it ('should set product', () => {

            const stateBefore = {
                product: {}
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

            deepFreeze(stateBefore);

            expect(
                selectedProduct(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should set only status', () => {

            const stateBefore = {
                product: {}
            };

            const action = {
                type: ActionsType.SELECT_PRODUCT,
                status: Constants.ERROR
            };

            const stateAfter = {
                status: Constants.ERROR,
                product: {}
            };

            deepFreeze(stateBefore);

            expect(
                selectedProduct(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should not modify', () => {

            const stateBefore = {
                product: {}
            };

            const action = {
                type: ActionsType.SELECT_PRODUCT
            };

            const stateAfter = {
                product: {}
            };

            deepFreeze(stateBefore);

            expect(
                selectedProduct(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

    });

});
