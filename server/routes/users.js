import express from 'express';
import bodyParser from 'body-parser';

import model from '../models/User';
import passport from '../libs/passport';

let router = express.Router();

router.route('/')
    .post(bodyParser.json(), (request, response) => {
        
        let newUser = request.body;
        if (!newUser.username || !newUser.password ) {
            response.sendStatus(400);
        }
        
        model.addUser(newUser.username, newUser.password, (error, result) => {
            if (error) {
                response.status(503).json({
                    status: 'ERROR',
                    resutls: {
                        message: 'error...'
                    }
                });
            }
            
            response.status(201).json({
                status: 'SUCCESS',
                results: result
            });
        });
    });

router.route('/:id')
    .get(bodyParser.json(), (request, response) => {
        const id = request.params.id;
        model.getUser(id, (error, user) => {
            if (error) {
                response.status(503).json({
                    status: 'ERROR',
                    resutls: {
                        message: 'error...'
                    }
                });
                return false;
            }
            
            response.status(200).json({
                status: 'SUCCESS',
                results: user
            });
        });
    });

export default router;
