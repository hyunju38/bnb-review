import express from 'express';

let router = express.Router();

router.route('/:id')
    .get((request, response) => {
        const product = {
            _id: 1,
            name: 'askfj;l',
            desc: ';alsdknv;laknev;lak',
            reviews: [
                {
                    _id: 1,
                    comment: 'sa;lekj',
                    score: 4,
                    user_id: 1
                },
                {
                    _id: 2,
                    comment: 'as;ljlekn',
                    score: 2,
                    user_id: 1
                }
            ]
        };
        response.json({
            data: product
        });
    });

export default router;
