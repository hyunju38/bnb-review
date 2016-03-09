import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductInfo from '../components/ProductInfo';
import ReviewList from '../components/ReviewList';

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
        return(
            <div>
                <ProductInfo {...product} />
                <ReviewList reviews={reviews}
                    getProduct={getProduct} />
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
        }
    };
};

export default connect(
    mapStateToProductProps,
    mapDispatchToProductProps
)(Product);
