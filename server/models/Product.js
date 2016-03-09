import mongodb from '../libs/mongodb';
import { Db, ObjectID } from 'mongodb';

// const PAGE = 1;
// const SIZE = 5;
// const SKIP = SIZE * (PAGE - 1);
// const LIMIT = SIZE;

const getSkip = (page = 1, size = 5) => {
    return  size * (page - 1);
};

const getWithReviews = (id, options = {}, callback) => {
    if (!(mongodb.getDb() instanceof Db)) {
        callback(new Error('You need to connect database'));
    }
    
    const defaultOptions = {
        page: 1,
        size: 5
    };
    
    const mergedOptions = Object.assign({}, defaultOptions, options);

    mongodb.getDb()
        .collection('products')
        .findOne({
            _id: ObjectID(id)
        }, (error, product) => {
            if (error) {
                callback(error);
            }

            const reviewsCursor = mongodb.getDb()
                                    .collection('reviews')
                                    .find({ product_id: product._id });
                                
            reviewsCursor.count((error, count) => {
                if (error) {
                    callback(error);
                }
                
                reviewsCursor.skip(getSkip(mergedOptions.page, mergedOptions.size))
                    .limit(mergedOptions.size)
                    .toArray((error, reviews) => {
                        if (error) {
                            callback(error);
                        }

                        product.reviews = {
                            items: reviews,
                            paginator: {
                                curPage: mergedOptions.page,
                                totalPage: Math.ceil(count / mergedOptions.size)
                            }
                        };

                        callback(error, product);
                    });
            });
    });
};

export default {
    getWithReviews
};
