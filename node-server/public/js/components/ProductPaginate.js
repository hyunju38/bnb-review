import React from 'react';

const getPages = (paginate) => {
    if (typeof paginate === 'undefined') {
        return [];
    }

    // getting current page
    const currentPage = paginate.current_page;
    const lastPage = paginate.last_page;
    let previousPage = [];
    let nextPage = [];

    // if current page - 1 or - 2 is less than 0
    if (currentPage - 1 > 0) {
        previousPage = [ currentPage - 1, ...previousPage ];
    }
    if (currentPage - 2 > 0) {
        previousPage = [ currentPage - 2, ...previousPage ];
    }
    // result array is [current, current + 1, current + 2]

    // if current page + 1 or +2 is greater than last page
    if (currentPage + 1 <= lastPage) {
        nextPage = [ ...nextPage, currentPage + 1 ];
    }
    if (currentPage + 2 <= lastPage) {
        nextPage = [ ...nextPage, currentPage + 2 ];
    }

    // result array is [current - 2, current -1, current]
    return [ ...previousPage, currentPage, ...nextPage ];
};

const ProductPaginate = ({
    fetchProducts,
    paginate
}) => {
    const pages = getPages(paginate);
    return(
        <div className="text-center">
            <ul className={'pagination'}>
                {
                    paginate && paginate.prev_page_url ?
                        <li>
                            <a href="#" aria-label="Previous"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchProducts(paginate.current_page - 1);
                                }}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        :
                        ''
                }

                {
                    pages ?
                        pages.map((page, index) =>
                            <li key={index}>
                                <a href="#"
                                    style={{
                                        textDecoration: page !== paginate.current_page ? 'none' : 'underline'
                                    }}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        fetchProducts(page);}}
                                >
                                    { page }
                                </a>
                            </li>
                        ) :
                        ''
                }

                {
                    paginate && paginate.current_page !== paginate.last_page ?
                        <li>
                            <a href="#" aria-label="Next"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchProducts(paginate.current_page + 1);
                                }}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        :
                        ''
                }
            </ul>
        </div>
    );
};

export default ProductPaginate;
