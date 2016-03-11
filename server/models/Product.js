import mongodb from '../libs/mongodb';
import { Db, ObjectID } from 'mongodb';

// const PAGE = 1;
const SIZE = 5;
// const SKIP = SIZE * (PAGE - 1);
// const LIMIT = SIZE;

const getSkip = (page = 1, size = 5) => {
    return  size * (page - 1);
};

const getList = (page = 1, callback) => {
    // items: reviews,
    // paginator: {
    //     curPage: mergedOptions.page,
    //     totalPage: Math.ceil(count / mergedOptions.size),
    //     size: mergedOptions.size,
    //     itemCount: count
    // }
    const productCurosr = mongodb.getDb().collection('products');
    productCurosr.count((error, count) => {
        productCurosr.find({})
            .skip((page - 1) * SIZE)
            .limit(SIZE)
            .toArray((error, products) => {
                if (error) {
                    callback(error);    
                }
                
                callback(error, {
                    items: products,
                    paginator: {
                        curPage: page,
                        totalPage: Math.ceil(count / SIZE),
                        size: SIZE,
                        itemCount: count
                    }
                });
            });
    });
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
                                totalPage: Math.ceil(count / mergedOptions.size),
                                size: mergedOptions.size,
                                itemCount: count
                            }
                        };

                        callback(error, product);
                    });
            });
    });
};

export default {
    getList,
    getWithReviews
};
