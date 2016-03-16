import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import reviews from '../../clients/src/reducers/reviews';

describe('Review reducer', () => {

    describe('ADD_REVIEW test code', () => {

        it('should add review object to results', () => {
            
            const stateBefore = {
                status: null,
                results: {
                    paginator: {
                        curPage: 1,
                        totalPage: 1,
                        size: 1,
                        itemCount: 1
                    },
                    items: [
                        {
                            '_id': 1,
                            'comment': 'something',
                            'score': 2,
                            'product_id': 3,
                            'user_id': 4
                        }
                    ]
                }
            };

            const action = {
                type: 'ADD_REVIEW',
                status: 'SUCCESS',
                review: {
                    '_id': 2,
                    'comment': 'something',
                    'score': 2,
                    'product_id': 3,
                    'user_id': 4
                }
            };

            const stateAfter = {
                status: 'SUCCESS',
                results: {
                    paginator: {
                        curPage: 1,
                        totalPage: 2,
                        size: 1,
                        itemCount: 2
                    },
                    items: [
                        {
                            '_id': 1,
                            'comment': 'something',
                            'score': 2,
                            'product_id': 3,
                            'user_id': 4
                        },
                        {
                            '_id': 2,
                            'comment': 'something',
                            'score': 2,
                            'product_id': 3,
                            'user_id': 4
                        }
                    ]
                } 
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);
        });

        it('should not modify if status is null', () => {
            const stateBefore = {
                status: null,
                results: {
                    paginator: {
                        curPage: 1,
                        totalPage: 1,
                        size: 1,
                        itemCount: 1
                    },
                    items: [
                        {
                            '_id': 1,
                            'comment': 'something',
                            'score': 2,
                            'product_id': 3,
                            'user_id': 4
                        }
                    ]
                }
            };

            const action = {
                type: 'ADD_REVIEW',
                status: null
            };

            const stateAfter = {
                status: null,
                results: {
                    paginator: {
                        curPage: 1,
                        totalPage: 1,
                        size: 1,
                        itemCount: 1
                    },
                    items: [
                        {
                            '_id': 1,
                            'comment': 'something',
                            'score': 2,
                            'product_id': 3,
                            'user_id': 4
                        }
                    ]
                }
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);
        });

        it('should add status if you have an error', () => {
            const stateBefore = {
                status: null,
                results: {
                    paginator: {
                        curPage: 1,
                        totalPage: 1,
                        size: 1,
                        itemCount: 1
                    },
                    items: [
                        {
                            '_id': 1,
                            'comment': 'something',
                            'score': 2,
                            'product_id': 3,
                            'user_id': 4
                        }
                    ]
                }
            };

            const action = {
                type: 'ADD_REVIEW',
                status: 'ERROR'
            };

            const stateAfter = {
                status: 'ERROR',
                results: {
                    paginator: {
                        curPage: 1,
                        totalPage: 1,
                        size: 1,
                        itemCount: 1
                    },
                    items: [
                        {
                            '_id': 1,
                            'comment': 'something',
                            'score': 2,
                            'product_id': 3,
                            'user_id': 4
                        }
                    ]
                }
            };

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);
        });

    });

});
