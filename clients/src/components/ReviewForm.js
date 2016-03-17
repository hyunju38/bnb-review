import React from 'react';
import { connect } from 'react-redux';

import addReview from '../actions/addReview';
import selectProduct from '../actions/selectProduct';

const DISPLAY_NAME = 'REVIEW_FORM';

const inputs = new Map();
const setInputs = (key) => {
    return input => {
        inputs.set(key, input);  
    };
};

const onClickAddReview = (productId, addReview, selectProduct) => {
    return event => {
        event.preventDefault();
        addReview(inputs.get('comment').value, inputs.get('score').value, productId)
            .then(result => selectProduct(productId, {}))
            .then(result => {
                inputs.get('comment').value = '';
                inputs.get('score').value = '';
            });
    };
}

const ReviewForm = ({
    product,
    addReview,
    selectProduct
}) => {
    return (
        <div>
            {
                product.status === 'SUCCESS' ?
                    <form action='/reviews'>
                        <div className="form-group">
                            <label htmlFor="comment">{'Comment'}</label>
                            <input id="comment" ref={setInputs('comment')} 
                                type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="score">{'Score'}</label>
                            <input id="score" ref={setInputs('score')}
                                type="number" className="form-control" min="1" max="5" />
                        </div>
                        <button type="submit" className="btn btn-default" 
                            onClick={onClickAddReview(product.results._id, addReview, selectProduct)} >
                            {'Submit'}
                        </button>
                    </form>       
                    :
                    ''
            }
        </div>
    );  
};
ReviewForm.displayName = DISPLAY_NAME;

const mapStateToProps = state => {
    return {
        product: state.selectedProduct
    }; 
};

const mapDispatchToProps = dispatch => {
    return {
        addReview(comment, score, productId){
            return dispatch(addReview({
                comment, 
                score,
                product_id: productId
            }));
        },
        selectProduct(productId, options = {}){
            return dispatch(selectProduct(productId, options));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewForm);