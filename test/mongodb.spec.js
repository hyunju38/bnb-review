import { expect } from 'chai';
import { Db } from 'mongodb';

import mongodb from '../server/libs/mongodb';

describe('mongodb lib', () => {
    it('Should get a mongodb client object', (done) => {
        mongodb.connect(() => {
            expect(
                mongodb.getDb() instanceof Db
            ).to.true;

            done();
        });
    });
});
