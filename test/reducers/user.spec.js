import { expect } from 'chai';
import React from 'react';
import deepFreeze from 'deep-freeze';

import user from '../../clients/src/reducers/user';

describe('user reducer', () => {

    describe('SIGNIN test code', () => {

        it ('should set user info', () => {

            const stateBefore = {
                status: null,
                results: {}
            };

            const action = {
                type: 'SIGNIN',
                status: 'SUCCESS',
                results:  {
                    username: 'test'
                }
            };

            const stateAfter = {
                status: 'SUCCESS',
                results:  {
                    username: 'test'
                }
            };

            deepFreeze(stateBefore);

            expect(
                user(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });
        
        it ('should set only status when status is not success', () => {
            const stateBefore = {
                status: null,
                results: {}
            };

            const action = {
                type: 'SIGNIN',
                status: 'ERROR',
                results:  {}
            };

            const stateAfter = {
                status: 'ERROR',
                results:  {}
            };

            deepFreeze(stateBefore);

            expect(
                user(stateBefore, action)
            ).to.deep.equal(stateAfter);

        });
    });

});
