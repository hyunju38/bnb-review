import express from 'express';

import passport from '../libs/passport';
import model from '../models/Product';

let router = express.Router();

router.route('/')
    .get(passport.authenticate('bearer', { session: false }), (request, response) => {
        const page = +request.query.page || 1;
        model.getList(page, (error, products) => {
            if (error) {
                return response.status(503).json({
                    error: true
                });
            }
            
            response.status(200).json({
                status: 'SUCCESS',
                results: products
            });
        });
    });

router.route('/:id')
    .get(passport.authenticate('bearer', { session: false }), (request, response) => {
        const options = {
            page: +request.query.page || 1,
            size: +request.query.size || 5
        };
        
        model.getWithReviews(request.params.id, options, (error, product) => {
            if (error) {
                return response.status(503).json({
                    error: true
                });
            }

            response.status(200).json({
                status: 'success',
                results: product
            });
        });
    });

export default router;
