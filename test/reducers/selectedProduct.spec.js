import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import selectedProduct from '../../clients/src/reducers/selectedProduct';

describe('SelectedProduct reducer', () => {

    describe('SELECT_PRODUCT test code', () => {

        it ('should set product', () => {

            const stateBefore = {
                status: null,
                results: {
                    name: '',
                    desc: '',
                    reviews: {
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
                            totalItem: 0
                        },
                        items: []
                    }
                }
            };

            const action = {
                type: 'SELECT_PRODUCT',
                status: 'SUCCESS',
                results:  {
                    '_id': 1,
                    'name': '룰루랄라',
                    'desc': '랄라라라라라라라라ㅏ라라랄라랄',
                    'reviews': {
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
                            totalItem: 2  
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
                results:  {
                    '_id': 1,
                    'name': '룰루랄라',
                    'desc': '랄라라라라라라라라ㅏ라라랄라랄',
                    'reviews': {
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
                            totalItem: 2  
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

            deepFreeze(stateBefore);

            expect(
                selectedProduct(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should set only status', () => {

            const stateBefore = {
                status: null,
                results: {
                    name: '',
                    desc: '',
                    reviews: {
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
                            totalItem: 0
                        },
                        items: []
                    }
                }
            };

            const action = {
                type: 'SELECT_PRODUCT',
                status: 'ERROR'
            };

            const stateAfter = {
                status: 'ERROR',
                results: {
                    name: '',
                    desc: '',
                    reviews: {
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
                            totalItem: 0
                        },
                        items: []
                    }
                }
            };

            deepFreeze(stateBefore);

            expect(
                selectedProduct(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

        it ('should not modify', () => {

            const stateBefore = {
                status: null,
                results: {
                    name: '',
                    desc: '',
                    reviews: {
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
                            totalItem: 0
                        },
                        items: []
                    }
                }
            };

            const action = {
                type: 'SELECT_PRODUCT',
                status: null
            };

            const stateAfter = {
                status: null,
                results: {
                    name: '',
                    desc: '',
                    reviews: {
                        paginator: {
                            curPage: 1,
                            totalPage: 1,
                            size: 5,
                            totalItem: 0
                        },
                        items: []
                    }
                }
            };

            deepFreeze(stateBefore);

            expect(
                selectedProduct(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

    });

});
