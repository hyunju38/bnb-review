import React from 'react';

const ReviewItem = ({ review, onClick }) => {
    return(
        <li data-id={review._id} data-user-id={review.user_id}>
            {`${review.score}: ${review.comment}`}
            <button onClick={onClick}>X</button>
        </li>
    );
};

export default ReviewItem;
