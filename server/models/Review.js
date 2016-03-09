import mongodb from '../libs/mongodb';
import { Db } from 'mongodb';

const addReview = (review, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You neet to connect database'));
    }
    
    if (!review) {
        callback(new Error('You neet review data'));
    }
    
    mongodb.getDb()
        .collection('reviews')
        .insertOne(review, (error, result) => {
            if (error) {
                callback(error);
            }
            
            callback(error, result);
        });
};

export default {
    addReview   
};