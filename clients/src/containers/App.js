import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import ProductNav from '../components/ProductNav';
import Navbar from './Navbar';
// import ProductList from '../components/ProductList';
// import ProductInfo from '../components/ProductInfo';
// import ReviewList from '../components/ReviewList';
// import ReviewForm from '../components/ReviewForm';

const DISPLAY_NAME = 'APP';

const App = () => {
    return(
        <div>
            <Navbar />
        </div>
    );
};
App.displayName = DISPLAY_NAME;

export default App;

// const mapStateToProductProps = (state) => {
//     return {
//         products: state.products,
//         selectedProduct: state.selectedProduct.results,
//         user: state.user
//     };
// };

// const mapDispatchToProductProps = (dispatch) => {
//     return {
//         fetchProductList(page = 1){
//             dispatch(fetchProductList(page));  
//         },
//         selectProduct(productid, options = {}){
//             return dispatch(selectProduct(productid, options));
//         },
//         addReview(product_id){
//             return (comment, score) => {
//                 dispatch(addReview({
//                     comment,
//                     score,
//                     product_id,
//                     user_id: 1
//                 }));  
//             };
//         },
//         signin(username, password){
//             return dispatch(signin(username, password));
//         },
//         signout(){
//             return dispatch({
//                 type: 'SIGNOUT',
//                 status: null
//             });
//         }
//     };
// };

// export default connect(
//     mapStateToProductProps,
//     mapDispatchToProductProps
// )(App);
