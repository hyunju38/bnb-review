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
        getProduct();
    }

    render(){

        const { product, reviews } = this.props;

        return(
            <div>
                <ProductInfo {...product} />
                <ReviewList reviews={reviews} />
            </div>
        );
    }
}
Product.displayName = DISPLAY_NAME;
Product.propTypes = {
    getProduct: PropTypes.func,
    product: PropTypes.shape({
        _id: PropTypes.number,
        name: PropTypes.string,
        desc: PropTypes.string,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.number,
                comment: PropTypes.string,
                score: PropTypes.number,
                user_id: PropTypes.number
            })
        )
    }),
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.number,
            comment: PropTypes.string,
            score: PropTypes.number,
            user_id: PropTypes.number
        })
    )
};

const mapStateToProductProps = (state) => {
    const product = state.selectedProduct.product || {};
    return {
        product,
        reviews: product.reviews || []
    };
};

const mapDispatchToProductProps = (dispatch) => {
    return {
        getProduct(){
            dispatch(selectProduct(1));
        }
    };
};

export default connect(
    mapStateToProductProps,
    mapDispatchToProductProps
)(Product);
