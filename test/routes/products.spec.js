import { expect } from 'chai';
import request from 'supertest';

import mongodb from '../../server/libs/mongodb';
import app from '../../server/app';

describe('products routes', () => {

    before((done) => {
        mongodb.connect(() => {
            done();
        });
    });

    it('Should returns a 200 status code', (done) => {
        request(app)
            .get('/products/56d94501ab9e222f7ada60e4')
            .expect(200, done);
    });

    it('Should returns a json format', (done) => {
        request(app)
            .get('/products/56d94501ab9e222f7ada60e4')
            .expect('Content-Type', /json/, done);
    });

    it('Should returns infomation for given product', (done) => {
        request(app)
            .get('/products/56d94501ab9e222f7ada60e4')
            .expect(/띠리따라/, done);
    });
});
