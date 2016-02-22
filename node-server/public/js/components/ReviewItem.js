import React from 'react';
import { connect } from 'react-redux';

import { removeReview } from '../actions/ActionsCreator';

const ReviewItem = ({ review, dispatch }) => {
    return(
        <li data-id={review._id} data-user-id={review.user_id}>
            {`${review.score}: ${review.comment}`}
            <button onClick={()=>{
                dispatch(removeReview(parseInt(review._id)));
            }}>X</button>
        </li>
    );
};
// ReviewItem.contextTypes = {
//     store: React.PropTypes.object
// };
// ReviewItem = connect()(ReviewItem);
export default connect()(ReviewItem);
