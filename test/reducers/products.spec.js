import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import products from '../../clients/src/reducers/products';

describe('products reducer', () => {

    describe('FETCH_PRODUCT_LIST test code', () => {

        it ('should get a product list', () => {

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
                type: 'FETCH_PRODUCT_LIST',
                status: 'SUCCESS',
                products: {
                    paginator: {
                        curPage: 1,
                        totalPage: 1,
                        size: 5,
                        itemCount: 2
                    },
                    items: [
                        {
                            _id: 1,
                            name : "띠리따라", 
                            desc : "따리랄아푸다므빞테드오"
                        },
                        {
                            _id: 2,
                            name: "또리다푸", 
                            desc : "루라드파브캅두사븣"
                        }
                    ]
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
                            _id: 1,
                            name : "띠리따라", 
                            desc : "따리랄아푸다므빞테드오"
                        },
                        {
                            _id: 2,
                            name: "또리다푸", 
                            desc : "루라드파브캅두사븣"
                        }
                    ]
                }
            };

            deepFreeze(stateBefore);

            expect(
                products(stateBefore, action)
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
                type: 'FETCH_PRODUCT_LIST',
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
                products(stateBefore, action)
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
                type: 'FETCH_PRODUCT_LIST',
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
                products(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });

    });

    // describe('ADD_REVIEW test code', () => {

    //     it('should add review object to response', () => {
            
    //         const stateBefore = {
    //             status: null,
    //             response: {
    //                 paginator: {
    //                     curPage: 1,
    //                     totalPage: 1,
    //                     size: 1,
    //                     itemCount: 1
    //                 },
    //                 items: [
    //                     {
    //                         '_id': 1,
    //                         'comment': 'something',
    //                         'score': 2,
    //                         'product_id': 3,
    //                         'user_id': 4
    //                     }
    //                 ]
    //             }
    //         };

    //         const action = {
    //             type: 'ADD_REVIEW',
    //             status: 'SUCCESS',
    //             review: {
    //                 '_id': 2,
    //                 'comment': 'something',
    //                 'score': 2,
    //                 'product_id': 3,
    //                 'user_id': 4
    //             }
    //         };

    //         const stateAfter = {
    //             status: 'SUCCESS',
    //             response: {
    //                 paginator: {
    //                     curPage: 1,
    //                     totalPage: 2,
    //                     size: 1,
    //                     itemCount: 2
    //                 },
    //                 items: [
    //                     {
    //                         '_id': 1,
    //                         'comment': 'something',
    //                         'score': 2,
    //                         'product_id': 3,
    //                         'user_id': 4
    //                     },
    //                     {
    //                         '_id': 2,
    //                         'comment': 'something',
    //                         'score': 2,
    //                         'product_id': 3,
    //                         'user_id': 4
    //                     }
    //                 ]
    //             } 
    //         };

    //         deepFreeze(stateBefore);

    //         expect(
    //             reviews(stateBefore, action)
    //         ).to.deep.equal(stateAfter);
    //     });

    //     it('should not modify if status is null', () => {
    //         const stateBefore = {
    //             status: null,
    //             response: {
    //                 paginator: {
    //                     curPage: 1,
    //                     totalPage: 1,
    //                     size: 1,
    //                     itemCount: 1
    //                 },
    //                 items: [
    //                     {
    //                         '_id': 1,
    //                         'comment': 'something',
    //                         'score': 2,
    //                         'product_id': 3,
    //                         'user_id': 4
    //                     }
    //                 ]
    //             }
    //         };

    //         const action = {
    //             type: 'ADD_REVIEW',
    //             status: null
    //         };

    //         const stateAfter = {
    //             status: null,
    //             response: {
    //                 paginator: {
    //                     curPage: 1,
    //                     totalPage: 1,
    //                     size: 1,
    //                     itemCount: 1
    //                 },
    //                 items: [
    //                     {
    //                         '_id': 1,
    //                         'comment': 'something',
    //                         'score': 2,
    //                         'product_id': 3,
    //                         'user_id': 4
    //                     }
    //                 ]
    //             }
    //         };

    //         deepFreeze(stateBefore);

    //         expect(
    //             reviews(stateBefore, action)
    //         ).to.deep.equal(stateAfter);
    //     });

    //     it('should add status if you have an error', () => {
    //         const stateBefore = {
    //             status: null,
    //             response: {
    //                 paginator: {
    //                     curPage: 1,
    //                     totalPage: 1,
    //                     size: 1,
    //                     itemCount: 1
    //                 },
    //                 items: [
    //                     {
    //                         '_id': 1,
    //                         'comment': 'something',
    //                         'score': 2,
    //                         'product_id': 3,
    //                         'user_id': 4
    //                     }
    //                 ]
    //             }
    //         };

    //         const action = {
    //             type: 'ADD_REVIEW',
    //             status: 'ERROR'
    //         };

    //         const stateAfter = {
    //             status: 'ERROR',
    //             response: {
    //                 paginator: {
    //                     curPage: 1,
    //                     totalPage: 1,
    //                     size: 1,
    //                     itemCount: 1
    //                 },
    //                 items: [
    //                     {
    //                         '_id': 1,
    //                         'comment': 'something',
    //                         'score': 2,
    //                         'product_id': 3,
    //                         'user_id': 4
    //                     }
    //                 ]
    //             }
    //         };

    //         deepFreeze(stateBefore);

    //         expect(
    //             reviews(stateBefore, action)
    //         ).to.deep.equal(stateAfter);
    //     });

    // });

});
