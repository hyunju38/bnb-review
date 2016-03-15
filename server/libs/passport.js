import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import jwt from 'jsonwebtoken';

import model from '../models/User';

passport.use(new BasicStrategy(
    (username, password, callback) => {
        if (error) {
            return callback(error);
        }
        
        return callback(null, {
            username: 'SUCCESS',
            results: 'some...'
        });
    }
));

export default passport;