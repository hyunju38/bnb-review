import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectedProduct } from '../actions/ActionsCreator';
import products from '../actions/products';

import ProductItem from '../components/ProductItem';

export class ProductList extends Component {

    // constructor(props){
    //     super(props);
    //     this._createPaginate = this._createPaginate.bind(this);
    // }

    componentDidMount(){
        // const { store } = this.context;
        // this.unsubscribe = store.subscribe(() => this.forceUpdate());
        const { fetchProducts } = this.props;
        fetchProducts();
    }

    // componentWillUnmount(){
    //     this.unsubscribe();
    // }

    render(){

        // const { keyword, products } = this.context.store.getState();
        const { fetchProducts, visibleProducts, onProductClick } = this.props;

        const { paginate, pages } = this.props;

        return(
            <div>
                <ul>
                    {
                        visibleProducts.map((product) =>
                            <ProductItem key={product._id}
                                onClick={onProductClick}
                                product={product}
                            />
                        )
                    }
                </ul>
                <div>
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
            </div>
        );
    }
}
// ProductList.contextTypes = {
//     store: React.PropTypes.object
// };
const mapStateToProductListProps = (state) => {

    // const paginate = state.paginate && typeof state.paginate.current_page !== 'undefined' ?
    //     [ state.paginate.current_page - 1, state.paginate.current_page, state.paginate.current_page + 1] :
    //     [ ];

    const paginate = state.paginate;
    const pages = typeof paginate !== 'undefined' ?
                    (function (paginate) {
                        let result = [];
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
                    })(paginate) :
                    [];

    return {
        // keyword에 해당되는 product를 filtering 하고, 만약 keyword가 없으면 모든 product를 보여 준다.
        visibleProducts: state.keyword !== '' ?
                            state.products.filter((product) => {
                                return product.name.indexOf(state.keyword) >= 0}
                            ) : state.products,
        paginate: state.paginate,
        pages
    };
};

const mapDispatchToProductListProps = (dispatch) => {
    return {
        onProductClick: (e) => {
            /**
             *  선택한 product의 정보와 reivew list를 보여 준다.
             */
            e.preventDefault();

            const listEl = e.target.parentNode;

            dispatch(selectedProduct(parseInt(listEl.dataset.id)));
        },
        fetchProducts: (page = 1) => {
            dispatch(products(page));
        }
    };
};

export default connect(
    mapStateToProductListProps,
    mapDispatchToProductListProps
)(ProductList);
