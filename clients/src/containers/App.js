import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductNav from '../components/ProductNav';
import ProductList from '../components/ProductList';
import ProductInfo from '../components/ProductInfo';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

import signin from '../actions/signin';
import fetchProductList from '../actions/fetchProductList';
import addReview from '../actions/addReview';
import selectProduct from '../actions/selectProduct';

const DISPLAY_NAME = 'PRODUCT';
const SELECTED_PRODUCT_ID = 1;

class Product extends Component {

    componentDidMount(){
        const { getProduct, fetchProductList, user } = this.props;

        if (user.status === 'SUCCESS') {
            fetchProductList();   
        }
    }

    render(){
        const { selectedProduct, user } = this.props;

        const { addReview } = this.props;

        const { products, fetchProductList } = this.props;

        const { selectProduct } = this.props;

        const { signin, signout } = this.props;

        return(
            <div>
                <ProductNav signin={signin} signout={signout} user={user} />
                {
                    user.status === 'SUCCESS' ?
                        <div className="row">
                            <div className="col-xs-6 col-md-6">
                                <ProductInfo {...selectProduct} />
                            </div>
                            <div className="col-xs-offset-6 col-md-offset-6 col-xs-6 col-md-6">
                                <ReviewForm addReview={addReview(selectedProduct._id)} />
                            </div>
                        </div>
                        :
                        <p>
                            You should sign in
                        </p>
                }
                {
                    user.status === 'SUCCESS' ?
                        <div className="row">
                            <div className="col-xs-6 col-md-6">
                                <ProductList products={products} 
                                        fetchProductList={fetchProductList} 
                                        selectProduct={selectProduct} />
                            </div>
                            <div className="col-xs-offset-6 col-md-offset-6 col-xs-6 col-md-6">
                                <ReviewList reviews={selectedProduct.reviews}
                                            getProduct={selectProduct} />
                            </div>
                        </div>
                        :
                        ''
                }
            </div>
        );

    }
}
Product.displayName = DISPLAY_NAME;

const mapStateToProductProps = (state) => {
    return {
        products: state.products,
        selectedProduct: state.selectedProduct.results,
        user: state.user
    };
};

const mapDispatchToProductProps = (dispatch) => {
    return {
        fetchProductList(page = 1){
            dispatch(fetchProductList(page));  
        },
        selectProduct(productid, options = {}){
            return dispatch(selectProduct(productid, options));
        },
        addReview(product_id){
            return (comment, score) => {
                dispatch(addReview({
                    comment,
                    score,
                    product_id,
                    user_id: 1
                }));  
            };
        },
        signin(username, password){
            return dispatch(signin(username, password));
        },
        signout(){
            return dispatch({
                type: 'SIGNOUT',
                status: null
            });
        }
    };
};

export default connect(
    mapStateToProductProps,
    mapDispatchToProductProps
)(Product);
