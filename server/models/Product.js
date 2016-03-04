import mongodb from '../libs/mongodb';
import { Db, ObjectID } from 'mongodb';

const getWithReviews = (id, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You need to connect database'));
    }

    mongodb.getDb()
        .collection('products')
        .findOne({
            _id: ObjectID(id)
        }, (error, product) => {
            if (error) {
                callback(error);
            }

            mongodb.getDb()
                .collection('reviews')
                .find({ product_id: product._id })
                .toArray((error, reviews) => {
                    if (error) {
                        callback(error);
                    }

                    product.reviews = reviews;

                    callback(error, product);
                });
    });
};

export default {
    getWithReviews
};
