import express from 'express';
import bodyParser from 'body-parser';

import model from '../models/User';

let router = express.Router();

router.route('/signin')
    .post(bodyParser.json(), (request, response) => {
        
        const { username, password } = request.body;
        if (!username || !password ) {
            response.sendStatus(400);
        }
        
        model.getUserByUsernameAndPassword(username, password, (error, result) => {
            if (error) {
                response.status(503).json({
                    status: 'ERROR',
                    resutls: {
                        message: 'error...'
                    }
                });
                return false;
            }
            
            response.status(201).json({
                status: 'success',
                results: result
            });
        });
    });

// router.route('/signout')
//     .post((request, response) => {
        
//         response.status(201).json({
//             status: 'success',
//             results: result
//         });
        
//         // model.getUserByUsernameAndPassword(username, password, (error, result) => {
//         //     if (error) {
//         //         response.status(503).json({
//         //             status: 'ERROR',
//         //             resutls: {
//         //                 message: 'error...'
//         //             }
//         //         });
//         //         return false;
//         //     }
            
//         //     response.status(201).json({
//         //         status: 'success',
//         //         results: result
//         //     });
//         // });
//     });

export default router;
