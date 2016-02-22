import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductInfo from '../components/ProductInfo';
import ReviewInput from '../components/ReviewInput';
import ReviewList from '../components/ReviewList';

// let Side = (props = {}, { store }) => {
class Side extends Component {

    // componentDidMount(){
    //     const { store } = this.context;
    //     this.unsubscribe = store.subscribe(() => this.forceUpdate());
    // }
    //
    // componentWillUnmount(){
    //     this.unsubscribe();
    // }

    render(){
        const { selectedProduct } = this.props;
        return(
            <div>
                {
                selectedProduct ?
                    <aside>
                        <ProductInfo selectedProduct={selectedProduct} />
                        <ReviewInput selectedProduct={selectedProduct} />
                        <ReviewList selectedProduct={selectedProduct} />
                    </aside>
                    :
                    null
                }
            </div>
        );
    }
};
// Side.contextTypes = {
//     store: React.PropTypes.object
// };

const mapStateToSideProps = (state) => {
    return {
        selectedProduct: state.products.filter((product) => {
            return product._id === state.selectedProductId;
        })[0] || null
    };
};

// const VisibleSide = connect(mapStateToSideProps)(Side);
export default connect(mapStateToSideProps)(Side);
