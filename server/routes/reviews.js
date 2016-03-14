import express from 'express';
import bodyParser from 'body-parser';

import model from '../models/Review';

let router = express.Router();

router.route('/')
    .post(bodyParser.json(), (request, response) => {
        
        const newReview = request.body;

        if (!newReview.product_id || !newReview.comment || !newReview.score) {
            response.sendStatus(400);
            return false;
        }

        newReview.user_id = 1;
        
        model.addReview(newReview, (error, review) => {
            if (error) {
                response.status(503).json({
                    error: true
                });
                return false;
            }
            
            response.status(201).json({
                status: 'SUCCESS',
                data: review
            });
        });
    });

export default router;
