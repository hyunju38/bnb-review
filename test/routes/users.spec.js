import { expect } from 'chai';
import request from 'supertest';

import mongodb from '../../server/libs/mongodb';
import app from '../../server/app';

describe('users routes', () => {

    describe('POST /users', () => {
        
        const username = 'test1';
        const password = 'test1';
        
        before((done) => {
            mongodb.connect(() => {
                done(); 
            });
        });
        
        afterEach((done) => {
            mongodb.getDb()
                .collection('users')
                .deleteOne({ username }, 
                (error, result) => {
                    done();
                });
        });
        
        it('should return a 201 status code', (done) => {
            request(app)
                .post('/users')
                .send({
                    username,
                    password
                })
                .expect(201, done);
        });
        
        it('should return a json format', (done) => {
            request(app)
                .post('/users')
                .send({
                    username,
                    password
                })
                .expect('Content-Type', /json/, done);
        });
        
        it('should return a success status', (done) => {
            request(app)
                .post('/users')
                .send({
                    username,
                    password
                })
                .expect(/success/, done); 
        });
        
    });

    describe('GET /users/:id', () => {
        
        const username = 'test';
        const password = 'test';
        
        before((done) => {
            mongodb.connect(() => {
                done();
            });
        });
        
        it('should return a 200 status code', (done) => {
            request(app)
                .get('/users/56e68f782d5e2e53c9813adb')
                .expect(200, done);
        });
        
        it('should return a json format', (done) => {
            request(app)
                .get(`/users/56e68f782d5e2e53c9813adb`)
                .expect('Content-Type', /json/, done);
        });
        
        it('should return an user', (done) => {
            request(app)
                .get(`/users/56e68f782d5e2e53c9813adb`)
                .expect(/test/, done); 
        });
        
    });

});
