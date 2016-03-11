import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import reviews from '../../clients/src/reducers/reviews';

describe('Review reducer', () => {

    describe('SELECT_PRODUCT test code', () => {

        it ('should get reviews data', () => {

            const stateBefore = {
                status: null,
                response: []
            };

            const action = {
                type: 'SELECT_PRODUCT',
                status: 'SUCCESS',
                product: {
                    '_id': 1,
                    'name': '룰루랄라',
                    'desc': '랄라라라라라라라라ㅏ라라랄라랄',
                    'reviews': {
                        status: null,
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
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
                                'comment': 'some..',
                                'score': 3,
                                'product_id': 4,
                                'user_id': 5
                            }
                        ]
                    }
                }
            };

            const stateAfter = {
                status: 'SUCCESS',
                response: {
                    paginator: {
                        curPage: 1,
                        totalPage: 1,
                        size: 5,
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
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should only set status if it have an error', () => {

            const stateBefore = {
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

            const action = {
                type: 'SELECT_PRODUCT',
                status: 'ERROR'
            };

            const stateAfter = {
                status: 'ERROR',
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

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should not modify if it just request', () => {

            const stateBefore = {
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

            const action = {
                type: 'SELECT_PRODUCT',
                status: null
            };

            const stateAfter = {
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

            deepFreeze(stateBefore);

            expect(
                reviews(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

    });

    describe('ADD_REVIEW test code', () => {

        it('should add review object to response', () => {
            
            const stateBefore = {
                status: null,
                response: {
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
                response: {
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
                response: {
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
                response: {
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
                response: {
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
                response: {
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
