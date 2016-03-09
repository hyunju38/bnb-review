import express from 'express';

import model from '../models/Product';

let router = express.Router();

router.route('/:id')
    .get((request, response) => {
        const options = {
            page: request.query.page || 1
        };
        
        model.getWithReviews(request.params.id, options, (error, product) => {
            if (error) {
                return response.status(503).json({
                    error: true
                });
            }

            response.status(200).json({ data: product });
        });
    });

export default router;
