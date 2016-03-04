import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import selectProduct from './actions/selectProduct';
import rootReducer from './reducers/index';
import Product from './containers/Product';

// import ProductInfo from './components/ProductInfo';
// import ReviewList from './components/ReviewList';

const store = createStore(rootReducer, applyMiddleware(thunk));

// const selectedProduct = {
//     _id: 1,
//     name: 'askfj;l',
//     desc: ';alsdknv;laknev;lak',
//     reviews: [
//         {
//             _id: 1,
//             comment: 'sa;lekj',
//             score: 4,
//             user_id: 1
//         },
//         {
//             _id: 2,
//             comment: 'as;ljlekn',
//             score: 2,
//             user_id: 1
//         }
//     ]
// };

// let unsubscribe = store.subscribe(() => {
//     console.log(store.getState());
// });
// store.dispatch(selectProduct(1));
// unsubscribe();

ReactDOM.render(
    <Provider store={store}>
        <Product />
    </Provider>,
    document.getElementById('root')
);
