import React from 'react';

const MAX_SCORE = 5;

const ReviewItem = ({ review, onClick }) => {

    return(

        <li data-id={review._id} data-user-id={review.user_id}>
            {
                (() => {
                    let scoreStars = [];
                    for (let i = 1; i < MAX_SCORE + 1; i ++) {
                        if (i <= review.score) {
                            scoreStars.push(
                                <span className="glyphicon glyphicon-star"
                                    aria-hidden="true" key={i}></span>
                            );
                        } else {
                            scoreStars.push(
                                <span className="glyphicon glyphicon-star-empty"
                                    aria-hidden="true" key={i}></span>
                            );
                        }
                    }
                    return scoreStars;
                })()
            }
            {` ${review.comment} `}
            <span className="glyphicon glyphicon-remove"
                aria-hidden="true"
                onClick={onClick}
            ></span>
        </li>
    );
};

export default ReviewItem;
