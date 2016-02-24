import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReview, removeReview } from '../actions/ActionsCreator';

import ProductInfo from '../components/ProductInfo';
import ReviewInput from '../components/ReviewInput';
import ReviewList from '../components/ReviewList';

// let Side = (props = {}, { store }) => {
export class Side extends Component {

    // componentDidMount(){
    //     const { store } = this.context;
    //     this.unsubscribe = store.subscribe(() => this.forceUpdate());
    // }
    //
    // componentWillUnmount(){
    //     this.unsubscribe();
    // }

    render(){
        const { onAddReviewButtonClick, onRemoveReviewButtonClick, selectedProduct } = this.props;
        return(
            <div>
                {
                selectedProduct ?
                    <aside>
                        <ProductInfo selectedProduct={selectedProduct} />
                        <ReviewInput onClick={onAddReviewButtonClick(selectedProduct._id)} />
                        <ReviewList onClick={onRemoveReviewButtonClick}
                            selectedProduct={selectedProduct}
                        />
                    </aside>
                    :
                    null
                }
            </div>
        );
    }
};
// Side.contextTypes = {
//     store: React.PropTypes.object
// };

const mapStateToSideProps = (state) => {
    return {
        selectedProduct: state.products.filter((product) => {
            return product._id === state.selectedProductId;
        })[0] || null
    };
};

const mapDispatchToSideProps = (dispatch, ownProps) => {
    return {
        onAddReviewButtonClick: (productId) => (textarea, inputNumber) => {
            dispatch(addReview(
                textarea.value || '',
                inputNumber.value || 0,
                productId,
                1
            ));
            textarea.value = '';
            inputNumber.value = '';
        },
        onRemoveReviewButtonClick: (id) => {
            dispatch(removeReview(id));
        }
    };
};

// const VisibleSide = connect(mapStateToSideProps)(Side);
export default connect(
    mapStateToSideProps,
    mapDispatchToSideProps
)(Side);
