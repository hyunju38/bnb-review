import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import rootReducer from '../public/js/reducers/reviews';

describe('Product Reducer tests', () => {
    it('Removing review', () => {
        const stateBefore = {
            products: [
                {
                    "_id": 1,
                    "name": "샘플 펜션",
                    "desc": "산 좋고, 물 좋고, 공기 좋고~",
                    "reviews": [
                        { '_id': 1, 'comment': '여긴 별로에요', 'score': 2, 'user_id': 1, 'product_id': 1 }
                    ]
                }
            ],
            keyword: '',
            selectedProductId: ''
        }

        const action = {
            type: 'REMOVE_REVIEW',
            id: 1
        };

        const stateAfter = {
            products: [
                {
                    "_id": 1,
                    "name": "샘플 펜션",
                    "desc": "산 좋고, 물 좋고, 공기 좋고~",
                    "reviews": []
                }
            ],
            keyword: '',
            selectedProductId: ''
        };

        deepFreeze(stateBefore);

        expect(
            rootReducer(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });

    it('Updating review', () => {
        const stateBefore = {
            products: [
                {
                    "_id": 1,
                    "name": "샘플 펜션",
                    "desc": "산 좋고, 물 좋고, 공기 좋고~",
                    "reviews": [
                        { '_id': 1, 'comment': '여긴 별로에요', 'score': 2, 'user_id': 1, 'product_id': 1 }
                    ]
                }
            ],
            keyword: '',
            selectedProductId: ''
        }

        const action = {
            type: 'UPDATE_REVIEW',
            id: 1,
            comment: '여긴 별~로에요~',
            score: 3
        };

        const stateAfter = {
            products: [
                {
                    "_id": 1,
                    "name": "샘플 펜션",
                    "desc": "산 좋고, 물 좋고, 공기 좋고~",
                    "reviews": [
                        { '_id': 1, 'comment': '여긴 별~로에요~', 'score': 3, 'user_id': 1, 'product_id': 1 }
                    ]
                }
            ],
            keyword: '',
            selectedProductId: ''
        }

        deepFreeze(stateBefore);

        expect(
            rootReducer(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });

    it('Adding review', () => {
        const stateBefore = {
            products: [
                {
                    "_id": 1,
                    "name": "샘플 펜션",
                    "desc": "산 좋고, 물 좋고, 공기 좋고~",
                    "reviews": []
                }
            ],
            keyword: '',
            selectedProductId: ''
        };

        const action = {
            type: 'ADD_REVIEW',
            comment: "여긴 별로에요",
            score: 2,
            user_id: 1,
            product_id: 1
        };

        const stateAfter = {
            products: [
                {
                    "_id": 1,
                    "name": "샘플 펜션",
                    "desc": "산 좋고, 물 좋고, 공기 좋고~",
                    "reviews": [
                        { '_id': 1, 'comment': '여긴 별로에요', 'score': 2, 'user_id': 1, 'product_id': 1 }
                    ]
                }
            ],
            keyword: '',
            selectedProductId: ''
        };

        deepFreeze(stateBefore);

        expect(
            rootReducer(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });
});

describe('Product Reducer tests', () => {
    it('searching products: set keyword', () => {
        const stateBefore = {
            products: [],
            keyword: '',
            selectedProductId: ''
        };
        const action = {
            type: 'SET_KEYWORD',
            keyword: '샘플'
        };
        const stateAfter = {
            products: [],
            keyword: '샘플',
            selectedProductId: ''
        };

        deepFreeze(stateBefore);

        expect(
            rootReducer(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });
});
