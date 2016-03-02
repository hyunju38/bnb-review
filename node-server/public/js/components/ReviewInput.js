import React from 'react';
import { connect } from 'react-redux';

const ReviewInput = ({
    onClick
}) => {
    let inputNumber, textarea;
    return(
        <div>
            <form>
                <div className="form-group">
                    <textarea className="form-control"
                        ref={(node) => { textarea = node }}
                        rows="5"
                    />
                </div>
                <div className="form-group">
                    <input className="form-control"
                        type="number"
                        ref={(node) => { inputNumber = node }}
                    />
                </div>
                <button className="btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(textarea, inputNumber);
                    }} >
                    리뷰 등록
                </button>
            </form>
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
