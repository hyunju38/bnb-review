import express from 'express';

import model from '../models/Product';

let router = express.Router();

router.route('/')
    .get((request, response) => {
        const page = +request.query.page || 1;
        model.getList(page, (error, productList) => {
            if (error) {
                return response.status(503).json({
                    error: true
                });
            }
            
            response.status(200).json({
                data: productList
            });
        });
    });

router.route('/:id')
    .get((request, response) => {
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
