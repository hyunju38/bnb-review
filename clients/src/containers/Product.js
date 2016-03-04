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
        getProduct('56d94501ab9e222f7ada60e4');
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
        _id: PropTypes.string,
        name: PropTypes.string,
        desc: PropTypes.string,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                comment: PropTypes.string,
                score: PropTypes.number,
                user_id: PropTypes.number
            })
        )
    }),
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
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
        getProduct(productid){
            dispatch(selectProduct(productid));
        }
    };
};

export default connect(
    mapStateToProductProps,
    mapDispatchToProductProps
)(Product);