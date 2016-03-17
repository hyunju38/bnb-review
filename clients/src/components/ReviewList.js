import React from 'react';

const DISPLAY_NAME = 'DISPLAY_NAME';

const onClickRemoveReview = (id, removeReview, refreshProductWithReviewList) => {
    return event => {
        event.preventDefault();
        
        if (!confirm('Do you really want to remove the review')) {
            return false;
        }
        
        removeReview(id)
            .then(result => {
                if (result.status !== 'SUCCESS') {
                    // TODO: alert..
                    return false;
                }

                refreshProductWithReviewList();
            });
    }
};

const ReviewList = ({
    reviews,
    removeReview,
    refreshProductWithReviewList,
    previousClass,
    nextClass,
    onClickPreviousPage,
    onClickNextPage
}) => {
    const { items } = reviews;

    return(
        <div>
            <div className="review-list list-group">
                {
                    items && items.map((item) => {
                        return(
                            <div className="list-group-item" key={item._id} >
                                <span className="glyphicon glyphicon-remove pull-right"
                                    onClick={onClickRemoveReview(item._id, removeReview, refreshProductWithReviewList)} ></span>
                                <h4 className="list-group-item-heading">
                                    {item.comment}                                    
                                </h4>
                                <p className="list-group-item-text">
                                    {`${item.score} by ${item.user.username}`}
                                </p>
                            </div>
                        );
                    })
                }
            </div>
            <nav>
                <ul className="pager">
                    <li className={previousClass}>
                        <a href="#" onClick={onClickPreviousPage}>
                            {'Previous'}
                        </a>
                    </li>
                    <li className={nextClass}>
                        <a href="#" onClick={onClickNextPage}>
                            {'Next'}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

ReviewList.displayName = DISPLAY_NAME;

export default ReviewList;
