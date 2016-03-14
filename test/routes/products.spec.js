import { expect } from 'chai';
import request from 'supertest';

import mongodb from '../../server/libs/mongodb';
import app from '../../server/app';

describe('products routes', () => {

    describe('GET', () => {
        before((done) => {
            mongodb.connect(() => {
                done(); 
            });
        });
        
        it('should returns a 200 status code', (done) => {
            request(app)
                .get('/products?page=1')
                .expect(200, done);
        });
        
        it('should returns a json format', (done) => {
            request(app)
                .get('/products?page=1')
                .expect('Content-Type', /json/, done);
        });
        
        it('should returns a product list', (done) => {
            request(app)
                .get('/products?page=1')
                .expect(/띠리따라/, done); 
        });
        
    });

    describe('/:id GET', () => {
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
        
        it('Should returns reviews of product', (done) => {
            request(app)
                .get('/products/56d94501ab9e222f7ada60e4?page=2')
                .expect(response => {
                    if ( response.body.results.reviews.length > 0 ) {
                        throw new Error("Reviews are empty on 2 Page");
                    }
                })
                .expect(/wkcn;lewfkmqwef/)
                .end((error) => {
                    if (error) {
                        throw error;
                    }
                    done();
                });
        });
    });

});
