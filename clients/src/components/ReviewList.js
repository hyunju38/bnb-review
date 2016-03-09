import React from 'react';

const DISPLAY_NAME = 'DISPLAY_NAME';

const ReviewList = ({
    reviews,
    getProduct
}) => {
    const { items, paginator } = reviews;
    let previousClass =  paginator && paginator.curPage === 1 ? 'previous disabled' : 'previous';
    let nextClass = paginator && paginator.curPage === paginator.totalPage ? 'next disabled' : 'next';    

    return(
        <div>
            <div className="review-list list-group">
                {
                    items && items.map((item) => {
                        return(
                            <a className="list-group-item"
                                href="#"
                                key={item._id} >
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
            <nav>
                <ul className="pager">
                    <li className={previousClass}>
                        <a href="#" onClick={event => {
                            event.preventDefault();
                            if (previousClass.search('disabled') !== -1) {
                                return;
                            }
                            getProduct('56d94501ab9e222f7ada60e4', {
                                page: paginator.curPage - 1
                            });
                        }}>
                            {'Previous'}
                        </a>
                    </li>
                    <li className={nextClass}>
                        <a href="#" onClick={event => {
                            event.preventDefault();
                            if (nextClass.search('disabled') !== -1) {
                                return;
                            }
                            getProduct('56d94501ab9e222f7ada60e4', {
                                page: paginator.curPage + 1
                            });
                        }}>
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
