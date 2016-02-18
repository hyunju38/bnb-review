import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import reviewApp from '../public/js/reducers/reviews';

describe('Product Reducer tests', () => {
    it('Removing review', () => {
        const stateBefore = {
            reviews: [
                { '_id': 1, 'comment': '여긴 별로에요', 'score': 2, 'user_id': 1 },
                { '_id': 2, 'comment': '여긴 괜찮아요', 'score': 4, 'user_id': 2 }
            ],
            keyword: ''
        }

        const action = {
            type: 'REMOVE_REVIEW',
            id: 1
        };

        const stateAfter = {
            reviews: [
                { '_id': 2, 'comment': '여긴 괜찮아요', 'score': 4, 'user_id': 2 }
            ],
            keyword: ''
        };

        deepFreeze(stateBefore);

        expect(
            reviewApp(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });

    it('Updating review', () => {
        const stateBefore = {
            reviews: [
                { '_id': 1, 'comment': '여긴 별로에요', 'score': 2, 'user_id': 1 },
                { '_id': 2, 'comment': '여긴 괜찮아요', 'score': 4, 'user_id': 2 }
            ],
            keyword: ''
        }

        const action = {
            type: 'UPDATE_REVIEW',
            id: 1,
            comment: '여긴 별~로에요~',
            score: 3
        };

        const stateAfter = {
            reviews: [
                { '_id': 1, 'comment': '여긴 별~로에요~', 'score': 3, 'user_id': 1 },
                { '_id': 2, 'comment': '여긴 괜찮아요', 'score': 4, 'user_id': 2 }
            ],
            keyword: ''
        }

        deepFreeze(stateBefore);

        expect(
            reviewApp(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });

    it('Adding review', () => {
        const stateBefore = {
            reviews: [],
            keyword: ''
        };

        const action = {
            type: 'ADD_REVIEW',
            comment: "여긴 별로에요",
            score: 2,
            user_id: 1
        };

        const stateAfter = {
            reviews: [
                { "_id" : 1, "comment" : "여긴 별로에요", "score" : 2, "user_id" : 1 }
            ],
            keyword: ''
        };

        deepFreeze(stateBefore);

        expect(
            reviewApp(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });
});

describe('Product Reducer tests', () => {
    it('searching products: set keyword', () => {
        const stateBefore = {
            reviews: [],
            keyword: ''
        };
        const action = {
            type: 'SET_KEYWORD',
            keyword: '샘플'
        };
        const stateAfter = {
            reviews: [],
            keyword: '샘플'
        };

        deepFreeze(stateBefore);

        expect(
            reviewApp(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });
});
