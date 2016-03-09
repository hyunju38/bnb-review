import express from 'express';

import products from './routes/products';
import reviews from './routes/reviews';

const app = express();

app.use(express.static('clients'));

app.use('/products', products);
app.use('/reviews', reviews);

app.get('/', (request, response) => {
  response.sendFile('./index.html');
});

// app.get('/products/:id', (request, response) => {
//     const product = {
//         _id: 1,
//         name: 'askfj;l',
//         desc: ';alsdknv;laknev;lak',
//         reviews: [
//             {
//                 _id: 1,
//                 comment: 'sa;lekj',
//                 score: 4,
//                 user_id: 1
//             },
//             {
//                 _id: 2,
//                 comment: 'as;ljlekn',
//                 score: 2,
//                 user_id: 1
//             }
//         ]
//     };
//     response.json({
//         data: product
//     });
// });

export default app;
