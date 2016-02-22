import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectedProduct } from '../actions/ActionsCreator';
import products from '../actions/products';

import ProductItem from '../components/ProductItem';

class ProductList extends Component {

    // constructor(props){
    //     super(props);
    //     this._showAside = this._showAside.bind(this);
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
        const { visibleProducts, onProductClick } = this.props;

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
            </div>
        );
    }
}
// ProductList.contextTypes = {
//     store: React.PropTypes.object
// };
const mapStateToProductListProps = (state) => {
    return {
        // keyword에 해당되는 product를 filtering 하고, 만약 keyword가 없으면 모든 product를 보여 준다.
        visibleProducts: state.keyword !== '' ?
                            state.products.filter((product) => {
                                return product.name.indexOf(state.keyword) >= 0}
                            ) : state.products
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
        fetchProducts: () => {
            dispatch(products());
        }
    };
};

export default connect(
    mapStateToProductListProps,
    mapDispatchToProductListProps
)(ProductList);
