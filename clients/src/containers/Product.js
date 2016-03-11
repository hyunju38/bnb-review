import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductInfo from '../components/ProductInfo';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

import addReview from '../actions/addReview';
import selectProduct from '../actions/selectProduct';

const DISPLAY_NAME = 'PRODUCT';
const SELECTED_PRODUCT_ID = 1;

class Product extends Component {

    componentDidMount(){
        const { getProduct } = this.props;
        getProduct('56d94501ab9e222f7ada60e4', {
            page: 1
        });
    }

    render(){
        const { getProduct, product, reviews } = this.props;
        
        const { addReview } = this.props;
        
        return(
            <div>
                <ProductInfo {...product} />
                <ReviewList reviews={reviews}
                    getProduct={getProduct} />
                <ReviewForm addReview={addReview(product._id)} />
            </div>
        );
        
    }
}
Product.displayName = DISPLAY_NAME;

const mapStateToProductProps = (state) => {
    const product = state.selectedProduct.product || {};
    return {
        product,
        reviews: product.reviews || {}
    };
};

const mapDispatchToProductProps = (dispatch) => {
    return {
        getProduct(productid, options = {}){
            dispatch(selectProduct(productid, options));
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
        }
    };
};

export default connect(
    mapStateToProductProps,
    mapDispatchToProductProps
)(Product);
