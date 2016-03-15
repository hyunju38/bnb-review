import { expect } from 'chai';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import mongodb from '../../server/libs/mongodb';
import app from '../../server/app';

describe('auth routes', () => {

    // describe('get /test', () => {

    //     before((done) => {
    //         mongodb.connect(() => {
    //             done(); 
    //         });
    //     });
        
    //     it('should return a 201 status code', (done) => {
    //         const testToken = jwt.sign({ 
    //             username: 'test', 
    //             password: 'test' 
    //         }, 'test');

    //         request(app)
    //             .get('/test')
    //             .set('Authorization', `Bearer ${testToken}`)
    //             .expect(200, done);
    //     });
        
    // });

    describe('POST /auth', () => {

        before((done) => {
            mongodb.connect(() => {
                done(); 
            });
        });
        
        it('should return a 201 status code', (done) => {
            request(app)
                .post('/signin')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .expect(201, done);
        });
        
        it('should return a json format', (done) => {
            request(app)
                .post('/signin')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .expect('Content-Type', /json/, done);
        });
        
        it('should return a success status', (done) => {
            request(app)
                .post('/signin')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .expect(/token/, done); 
        });
        
    });

});
