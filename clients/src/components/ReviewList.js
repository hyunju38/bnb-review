import React from 'react';

const DISPLAY_NAME = 'DISPLAY_NAME';

const ReviewList = ({
    reviews
}) => {
    const { items, paginator } = reviews;
    return(
        <div className="review-list list-group">
            {
                items && items.map((item) => {
                    return(
                        <a className="list-group-item"
                            href="#"
                            key={item._id}
                        >
                            <h4 className="list-group-item-heading">
                                {`${item.score} by ${item.user_id}`}
                            </h4>
                            <p className="list-group-item-text">
                                {item.comment}
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
