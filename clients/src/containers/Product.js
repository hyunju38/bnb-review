import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ProductList from '../components/ProductList';
import ProductInfo from '../components/ProductInfo';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

import fetchProductList from '../actions/fetchProductList';
import addReview from '../actions/addReview';
import selectProduct from '../actions/selectProduct';

const DISPLAY_NAME = 'PRODUCT';
const SELECTED_PRODUCT_ID = 1;

class Product extends Component {

    componentDidMount(){
        const { getProduct, fetchProductList } = this.props;
        // getProduct('56d94501ab9e222f7ada60e4', {
        //     page: 1
        // });

        fetchProductList();
    }

    render(){
        const { selectedProduct } = this.props;
        
        const { addReview } = this.props;
        
        const { products, fetchProductList } = this.props;
        
        const { selectProduct } = this.props;
        
        return(
            <div>
                <ProductList products={products} 
                    fetchProductList={fetchProductList} 
                    selectProduct={selectProduct} />
                <ProductInfo {...selectProduct} />
                <ReviewList reviews={selectedProduct.reviews}
                    getProduct={selectProduct} />
                <ReviewForm addReview={addReview(selectedProduct._id)} />
            </div>
        );
        
    }
}
Product.displayName = DISPLAY_NAME;

const mapStateToProductProps = (state) => {
    // const product = state.selectedProduct.product || {};
    return {
        products: state.products,
        selectedProduct: state.selectedProduct.results
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
        }
    };
};

export default connect(
    mapStateToProductProps,
    mapDispatchToProductProps
)(Product);
