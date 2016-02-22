import React from 'react';
import { connect } from 'react-redux';

import { addReview } from '../actions/ActionsCreator';

const ReviewInput = ({ selectedProduct, dispatch }) => {
    let inputNumber, textarea;
    return(
        <div>
            <textarea ref={(node) => { textarea = node }}/>
            <input type="number" ref={(node) => { inputNumber = node }}/>
            <button onClick={() => {
                dispatch(addReview(
                    textarea.value,
                    inputNumber.value,
                    selectedProduct._id,
                    1
                ));
                textarea.value = '';
                inputNumber.value = '';
            }}>리뷰 등록</button>
        </div>
    );
};
// ReviewInput.contextTypes = {
//     store: React.PropTypes.object
// };
// ReviewInput = connect()(ReviewInput);
export default connect()(ReviewInput);
