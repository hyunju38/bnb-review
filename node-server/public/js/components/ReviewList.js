import React from 'react';

import ReviewItem from './ReviewItem';

const ReviewList = ({
    selectedProduct
}) => {
    return(
        <div>
            <ul>
                {
                    selectedProduct.reviews.map(review =>
                        <ReviewItem key={review._id}
                            review={review}
                        />
                    )
                }
            </ul>
        </div>
    );
};

export default ReviewList;
