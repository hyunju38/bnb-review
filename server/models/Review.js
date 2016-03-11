import mongodb from '../libs/mongodb';
import { Db, ObjectID } from 'mongodb';

const addReview = (review, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You neet to connect database'));
    }
    
    if (!review) {
        callback(new Error('You neet review data'));
    }
    
    const modifiedReview = Object.assign({}, review, {
        product_id: ObjectID(review.product_id)
    });
    
    mongodb.getDb()
        .collection('reviews')
        .insertOne(modifiedReview, (error, result) => {
            if (error) {
                callback(error);
            }
            
            mongodb.getDb()
                .collection('reviews')
                .findOne({
                    _id: result.insertedId
                }, (error, review) => {
                    if (error) {
                        callback(error);
                    }
                    callback(error, review);
                });
        });
};

export default {
    addReview   
};