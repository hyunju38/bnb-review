import passport from 'passport';
// import { BasicStrategy } from 'passport-http';
import { Strategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';

import model from '../models/User';

passport.use(new Strategy(
    (token, callback) => {
        console.log('token', token);
        jwt.verify(token, 'test', (error, decoded) => {
            if (error) {
                return callback(error);
            }
            console.log('decoded', decoded);
            model.getUserByUsernameAndPassword(decoded.username, decoded.password, (error, user) => {
                if (error) {
                    return callback(error);
                }
                
                console.log('user', user);
                return callback(error, user);
            });
        });
    }
));

// passport.use(new BasicStrategy(
//     (username, password, callback) => {
//         if (error) {
//             return callback(error);
//         }
        
//         return callback(null, {
//             username: 'SUCCESS',
//             results: 'some...'
//         });
//     }
// ));

export default passport;