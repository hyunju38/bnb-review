import React from 'react';

const DISPLAY_NAME = 'DISPLAY_NAME';

const ReviewList = ({
    reviews,
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
                            <a className="list-group-item" href="#" key={item._id} >
                                <h4 className="list-group-item-heading">
                                    {item.comment}
                                </h4>
                                <p className="list-group-item-text">
                                    {`${item.score} by ${item.user.username}`}
                                </p>
                            </a>
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
