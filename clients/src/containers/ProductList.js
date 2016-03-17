import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchProductList from '../actions/fetchProductList';
import selectProduct from '../actions/selectProduct';

class ProductList extends Component {

    constructor(props){
        super(props);
        
        this.handleClickSelectProduct = this.handleClickSelectProduct.bind(this);
        this.handleClickPreviousPage = this.handleClickPreviousPage.bind(this);
        this.handleClickNextPage = this.handleClickNextPage.bind(this);
        
        this._getPreviousClass = this._getPreviousClass.bind(this);
        this._getNextClass = this._getNextClass.bind(this);
        
        this._closestByClass = this._closestByClass.bind(this);
    }

    componentDidMount(){
        const { fetchProductList } = this.props;

        fetchProductList();
    }
    
    handleClickSelectProduct(event){
        event.preventDefault();
        
        const { selectProduct } = this.props;
        
        let target = this._closestByClass(event.target, 'list-group-item');
        
        if (!target) {
            return false;
        }
        
        selectProduct(target.dataset['productId']);
    }
    
    _closestByClass(element, className){
        while (element && element !== document.body) {
            if (element.classList.contains(className)) {
                return element;
            } else if (element.parentNode) {
                element = element.parentNode;
            } else {
                return null;
            }
        }
    }
    
    handleClickPreviousPage(event){
        event.preventDefault();
        
        const { products, fetchProductList } = this.props;
        const { paginator } = products.results;
        
        if (this._getPreviousClass(paginator).search('disabled') !== -1) {
            return;
        }
        fetchProductList(paginator.curPage - 1);
    }
    
    handleClickNextPage(event){
        event.preventDefault();
        
        const { products, fetchProductList } = this.props;
        const { paginator } = products.results;
        
        if (this._getNextClass(paginator).search('disabled') !== -1) {
            return;
        }
        fetchProductList(paginator.curPage + 1);
    }
    
    _getPreviousClass(){
        const { paginator } = this.props.products.results;
        return paginator && paginator.curPage > 1 ? 'previous' : 'previous disabled';
    }
    
    _getNextClass(){
        const { paginator } = this.props.products.results;
        return paginator && paginator.curPage < paginator.totalPage ? 'next' : 'next disabled';
    }
    
    render(){
        const { items } = this.props.products.results;
        
        return(
            <div>
                <div className="list-group">
                    {
                        items.map(item =>
                            <a className="list-group-item" href="#" key={item._id} 
                                data-product-id={item._id} onClick={this.handleClickSelectProduct} >
                                <h4 className="list-group-item-heading"> {item.name} </h4>
                                <p className="list-group-item-text"> {item.desc} </p>
                            </a>
                        )
                    }
                </div>
                <nav>
                    <ul className="pager">
                        <li className={this._getPreviousClass()}>
                            <a href="#" onClick={this.handleClickPreviousPage}> {'Previous'} </a>
                        </li>
                        <li className={this._getNextClass()}>
                            <a href="#" onClick={this.handleClickNextPage}> {'Next'} </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    };
};

const mapDistpatchToProps = (dispatch) => {
    return {
         fetchProductList(page = 1){
             return dispatch(fetchProductList(page));
         },
         selectProduct(productId, options = {}){
             return dispatch(selectProduct(productId, options));
         }
    };
};

export default connect(
    mapStateToProps,
    mapDistpatchToProps
)(ProductList);
