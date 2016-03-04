import { MongoClient } from 'mongodb';

const URL = 'mongodb://127.0.0.1:27017/bnbreview';

let state = {};

const connect = callback => {
    if (typeof state.db !== 'undefined') {
        return callback();
    }

    MongoClient.connect(URL, (error, db) => {
        if (error) {
            return callback(error);
        }

        state.db = db;
        return callback();
    });
};

const getDb = () => state.db;

export default {
    connect,
    getDb
};
