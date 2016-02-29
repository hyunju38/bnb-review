import React from 'react';
import { connect } from 'react-redux';

import { removeReview } from '../actions/ActionsCreator';

import ReviewItem from './ReviewItem';

const ReviewList = ({
    selectedProduct,
    onClick
}) => {
    return(
        <div style={{marginTop: 30}}>
            <ul className="list-unstyled">
                {
                    selectedProduct.reviews.map(review =>
                        <ReviewItem key={review._id}
                            onClick={() => { onClick(review._id); }}
                            review={review}
                        />
                    )
                }
            </ul>
        </div>
    );
};


// const mapDispatchToReviewListProps = (dispatch) => {
//     return {
//         onRemoveReviewButtonClick: (id) => {
//             dispatch(removeReview(id));
//         }
//     };
// };
//
// export default connect(
//     null,
//     mapDispatchToReviewListProps
// )(ReviewList);

export default ReviewList;
