import React from 'react';

const DISPLAY_NAME = 'DISPLAY_NAME';

const ReviewList = ({
    reviews
}) => {
    return(
        <div className="review-list list-group">
            {
                reviews.map((review) => {
                    return(
                        <a className="list-group-item"
                            href="#"
                            key={review._id}
                        >
                            <h4 className="list-group-item-heading">
                                {`${review.score} by ${review.user_id}`}
                            </h4>
                            <p className="list-group-item-text">
                                {review.comment}
                            </p>
                        </a>
                    );
                })
            }
        </div>
    );
};

ReviewList.displayName = DISPLAY_NAME;

export default ReviewList;
