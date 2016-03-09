import { expect } from 'chai';
import request from 'supertest';

import mongodb from '../../server/libs/mongodb';
import app from '../../server/app';

describe('reviews routes', () => {
    
    describe('Creating new review', () => {
        before(done => {
            mongodb.connect(() => {
                done();
            });
        });
        
        after(done => {
            mongodb.getDb()
                .collection('reviews')
                .deleteMany({
                    comment: 'this is test'
                }, (error, result) => {
                    done();
                });
        });
        
        it('should return a 201 status code', (done) => {
            request(app)
                .post('/reviews')
                .send('comment=this+is+test&score=3&product_id=56d94501ab9e222f7ada60e4')
                .expect(201, done); 
        });
        
        it('should return SUCCESS status', (done) => {
            request(app)
                .post('/reviews')
                .send('comment=this+is+test&score=3&product_id=56d94501ab9e222f7ada60e4')
                .expect(/success/i, done); 
        });
        
        it('should validate comment, score and product_id', (done) => {
            request(app)
                .post('/reviews')
                .send('comment=&score=&product_id=')
                .expect(400, done); 
        });
    });

});