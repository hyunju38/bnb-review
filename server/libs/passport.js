import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';

import model from '../models/User';

passport.use(new Strategy(
    (token, callback) => {
        // console.log('token', token);
        jwt.verify(token, 'TEST', (error, decoded) => {
            if (error) {
                return callback(error);
            }

            model.getUserByToken(token, (error, user) => {
                if (error) {
                    return callback(error);
                } 
                
                if (!user) {
                    return callback(null, false);
                }
                
                return callback(null, user);
            });
        });
    }
));

export default passport;

// passport.use(new Strategy(
//     (token, callback) => {
//         model.getUserByToken(token, (error, user) => {
//             if (error) {
//                 return callback(error);
//             } 
            
//             if (!user) {
//                 return callback(null, false);
//             }
            
//             return callback(null, user);
//         })
//     }
// ));

// // passport.use(new BasicStrategy(
// //     (username, password, callback) => {
// //         console.log('username', username);
// //         model.getUser(username, (error, user) => {
// //             if (error) {
// //                 return callback(error);
// //             } 
            
// //             if (!user) {
// //                 return callback(null, false);
// //             }
            
// //             return callback(null, user);
// //         });
// //     }
// // ));

// export default passport;