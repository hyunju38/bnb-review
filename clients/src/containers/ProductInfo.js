import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectProduct from '../actions/selectProduct';

import ProductDetail from '../components/ProductDetail';
import ReviewList from '../components/ReviewList';

class ProductInfo extends Component {

    constructor(props){
        super(props);
        
        this.handleClickPreviousPage = this.handleClickPreviousPage.bind(this);
        this.handleClickNextPage = this.handleClickNextPage.bind(this);
        
        this._getPreviousClass = this._getPreviousClass.bind(this);
        this._getNextClass = this._getNextClass.bind(this);
    }
    
    handleClickPreviousPage(event){
        event.preventDefault();
        
        const { product, fetchProductWithReviewList } = this.props;
        const { paginator } = product.results.reviews;
        
        if (this._getPreviousClass(paginator).search('disabled') !== -1) {
            return;
        }
        fetchProductWithReviewList(product.results._id, { page: paginator.curPage - 1 });
    }
    
    handleClickNextPage(event){
        event.preventDefault();
        
        const { product, fetchProductWithReviewList } = this.props;
        const { paginator } = product.results.reviews;
        
        if (this._getNextClass(paginator).search('disabled') !== -1) {
            return;
        }
        fetchProductWithReviewList(product.results._id, { page: paginator.curPage + 1 });
    }
    
    _getPreviousClass(){
        const { paginator } = this.props.product.results.reviews;
        return paginator && paginator.curPage > 1 ? 'previous' : 'previous disabled';
    }
    
    _getNextClass(){
        const { paginator } = this.props.product.results.reviews;
        return paginator && paginator.curPage < paginator.totalPage ? 'next' : 'next disabled';
    }
    
    render(){
        const { product } = this.props;
        
        return(
            <div>
                {
                    product.status === 'SUCCESS' ?
                        <div>
                            <ProductDetail name={product.results.name} desc={product.results.desc}/>
                            <ReviewList reviews={product.results.reviews}
                                previousClass={this._getPreviousClass()}
                                nextClass={this._getNextClass()}
                                onClickPreviousPage={this.handleClickPreviousPage}
                                onClickNextPage={this.handleClickNextPage} />
                        </div>
                        :
                        <div>
                            <p> Choose your favorite bnb.</p>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.selectedProduct
    };
};

const mapDistpatchToProps = (dispatch) => {
    return {
        fetchProductWithReviewList(productId, options){
            return dispatch(selectProduct(productId, options));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(ProductInfo);
