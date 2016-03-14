import mongodb from '../libs/mongodb';
import jwt from 'jsonwebtoken';
import { Db, ObjectID } from 'mongodb';
import bcrypt from 'bcrypt-nodejs';

const addUser = (username, password, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You neet to connect database'));
    }
    
    bcrypt.genSalt(5, (error, salt) => {
        if (error) {
            callback(error);
        }
        
        bcrypt.hash(password, salt, null, (error, hash) => {
            if (error) {
                callback(error);
            }
            
            const token = jwt.sign({
                username,
                hash
            }, 'TEST');
            
            mongodb.getDb()
                .collection('users')
                .insertOne({
                    username,
                    password: hash,
                    token
                }, (error, result) => {
                    if (error) {
                        callback(error);
                    }

                    callback(error, {
                        status: 'success',
                        results: result
                    });
                });
        });
    });
    
};

const getUser = (id, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You neet to connect database'));
    }
    
    mongodb.getDb()
        .collection('users')
        .findOne({
            _id: ObjectID(id)
        }, (error, user) => {
            if (error) {
                callback(error);
            }
            callback(error, user);
        });
};

const getUserByToken = (token, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You neet to connect database'));
    }
    
    mongodb.getDb()
        .collection('users')
        .findOne({ token }, (error, user) => {
            if (error) {
                callback(error);
            }
            callback(error, user);
        });
};

export default {
    addUser,
    getUser,
    getUserByToken
};