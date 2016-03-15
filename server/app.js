import express from 'express';
import bodyParser from 'body-parser';

// import passport from 'passport';
// import { Strategy } from 'passport-http-bearer';
// import model from './models/User';
import passport from './libs/passport';

import auth from './routes/auth';
import users from './routes/users';
import products from './routes/products';
import reviews from './routes/reviews';

const app = express();

app.use(passport.initialize());

app.use(express.static('clients'));

app.use('/', auth);

app.use('/users', users);
app.use('/products', products);
app.use('/reviews', reviews);

app.get('/', (request, response) => {
  response.sendFile('./index.html');
});

// // passport.authenticate('basic', { session: false }), 
// app.post('/signin', (request, response) => {
//     response.json({
//         status: 'SUCCESS',
//         results: request.user
//     });
// });

// app.get('/me', passport.authenticate('bearer', { session: false }), (request, response) => {
//     // console.log('user', request.user);
//     response.json({
//         status: 'SUCCESS',
//         results: request.user
//     });
// });

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
