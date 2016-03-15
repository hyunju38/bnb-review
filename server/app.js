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

// app.get('/test', passport.authenticate('bearer', { session: false }), (request, response) => {
//     console.log('user', request.user);
//     response.send('..');
// });

export default app;
