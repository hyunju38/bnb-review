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

const getUserByUsernameAndPassword = (username, password, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You neet to connect database'));
    }
    
    mongodb.getDb()
        .collection('users')
        .findOne({ username }, (error, user) => {
            if (error) {
                callback(error);
                return false;
            }
            if (!user) {
                callback(new Error('test..'));
                return false;
            }
            if (user.password !== password) {
                callback(new Error('test..'));
                return false;
            }
            
            const token = jwt.sign({ username, password }, 'test');
            
            callback(error, {
                username: username,
                token
            });
        });
};

export default {
    addUser,
    getUser,
    getUserByUsernameAndPassword
};