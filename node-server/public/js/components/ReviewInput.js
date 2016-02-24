import React from 'react';
import { connect } from 'react-redux';

const ReviewInput = ({
    onClick
}) => {
    let inputNumber, textarea;
    return(
        <div>
            <textarea ref={(node) => { textarea = node }} />
            <input type="number" ref={(node) => { inputNumber = node }} />
            <button onClick={() => { onClick(textarea, inputNumber); }} >
                리뷰 등록
            </button>
        </div>
    );
};
// ReviewInput.contextTypes = {
//     store: React.PropTypes.object
// };
// ReviewInput = connect()(ReviewInput);

// const mapDispatchToReviewInputProps = (dispatch, ownProps) => {
//     return {
//         onAddReviewButtonClick: () => {
//             dispatch(addReview(
//                 textarea.value,
//                 inputNumber.value,
//                 ownProps.selectedProduct._id,
//                 1
//             ));
//             textarea.value = '';
//             inputNumber.value = '';
//         }
//     };
// };
//
// export default connect(
//     null,
//     mapDispatchToReviewInputProps
// )(ReviewInput);

export default ReviewInput;
