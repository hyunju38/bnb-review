import express from 'express';
import bodyParser from 'body-parser';

import passport from '../libs/passport';
import model from '../models/Review';

let router = express.Router();

router.route('/')
    .post(passport.authenticate('bearer', { session: false }), bodyParser.json(), (request, response) => {
        
        const newReview = request.body;

        if (!newReview.product_id || !newReview.comment || !newReview.score) {
            response.sendStatus(400);
            return false;
        }
        
        // console.log('user', request.user);
        newReview.user = {
            id: request.user._id,
            username: request.user.username
        };
        newReview.created_at = new Date();
        
        model.addReview(newReview, (error, review) => {
            if (error) {
                response.status(503).json({
                    error: true
                });
                return false;
            }
            
            response.status(201).json({
                status: 'SUCCESS',
                results: review
            });
        });
    });

export default router;
