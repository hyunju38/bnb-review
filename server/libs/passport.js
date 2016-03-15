import passport from 'passport';
import { BasicStrategy } from 'passport-http';
// import { Strategy } from 'passport-http-bearer';
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

        // model.getUserByToken(token, (error, user) => {
        //     if (error) {
        //         return callback(error);
        //     } 
            
        //     if (!user) {
        //         return callback(null, false);
        //     }
            
        //     return callback(null, user);
        // });
    }
));

// passport.use(new Strategy(
//     (token, callback) => {
//         jwt.verify(token, 'TEST', (error, decoded) => {
//             if (error) {
//                 return callback(error);
//             }

//             model.getUserByToken(token, (error, user) => {
//                 if (error) {
//                     return callback(error);
//                 } 
                
//                 if (!user) {
//                     return callback(null, false);
//                 }
                
//                 return callback(null, user);
//             });
//         });
//     }
// ));

export default passport;