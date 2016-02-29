import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectedProduct } from '../actions/ActionsCreator';
import products from '../actions/products';

import ProductPaginate from '../components/ProductPaginate';
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
        const { fetchProducts, onProductClick, paginate, visibleProducts } = this.props;

        return(
            <div style={{marginTop: 30}}>
                <div className="list-group">
                    {
                        visibleProducts.map((product) =>
                            <ProductItem key={product._id}
                                onClick={onProductClick}
                                product={product}
                            />
                        )
                    }
                </div>
                <ProductPaginate
                    fetchProducts={fetchProducts}
                    paginate={paginate}
                />
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

    return {
        // keyword에 해당되는 product를 filtering 하고, 만약 keyword가 없으면 모든 product를 보여 준다.
        visibleProducts: state.keyword !== '' ?
                            state.products.filter((product) => {
                                return product.name.indexOf(state.keyword) >= 0}
                            ) : state.products,
        paginate: state.paginate
    };
};

const mapDispatchToProductListProps = (dispatch) => {
    return {
        onProductClick: (e) => {
            /**
             *  선택한 product의 정보와 reivew list를 보여 준다.
             */
            e.preventDefault();

            // const listEl = e.target.parentNode;

            dispatch(selectedProduct(e.target.dataset.id));
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
