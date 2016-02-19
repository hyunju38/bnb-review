import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/reviews';

const store = createStore(rootReducer, applyMiddleware(thunk));
const products = () => {
    return (dispatch, getState) => {
        // products data 요청
        dispatch({
            type: 'REQUEST_PRODUCTS'
        });

        // ajax call
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest();
            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 400) {
                    resolve(JSON.parse(httpRequest.response).data);
                }
            };
            httpRequest.onerror = () => {
                reject(new Error('error'));
            };
            httpRequest.open('GET', 'http://api.com/products');
            httpRequest.send();
        })
        .then((products) => {
            dispatch({
                type: 'RECIEVE_PRODUCTS',
                products
            });
        })
        .catch((error) => {
            dispatch({
                type: 'RECIEVE_ERROR',
                error
            });
        });
    };
};

class App extends Component {
    constructor(props){
        super(props);
        this._showAside = this._showAside.bind(this);
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            const { keyword, reviews } = store.getState();
            this.forceUpdate();
        });

        // API server로 부터 products data를 받는다.
        store.dispatch(products());
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    /**
     *  선택한 product의 정보와 reivew list를 보여 준다.
     */
    _showAside(e){
        e.preventDefault();

        const listEl = e.target.parentNode;

        store.dispatch({
            type: 'SELECTED_PRODUCT',
            id: parseInt(listEl.dataset.id)
        });
    }


    render(){
        let inputText, inputNumber, textarea;
        const state = store.getState();
        const { keyword, products, selectedProductId } = state;

        const selectedProduct = products.filter((product) => {
            return product._id === selectedProductId;
        })[0] || null;

        // keyword에 해당되는 product를 filtering 하고, 만약 keyword가 없으면 모든 product를 보여 준다.
        const visibleProducts = keyword !== '' ?
                                    products.filter((product) => {
                                        return product.name.indexOf(keyword) >= 0}
                                    ) : products;

        return(
            <div>
                <div>
                    <input type="text" ref={(node) => { inputText = node }}/>
                    <button onClick={()=>store.dispatch({
                        type: 'SET_KEYWORD',
                        keyword: inputText.value
                    })}>Search</button>
                </div>
                <div>
                    <ul>
                        {
                            visibleProducts.map((product) =>
                                <li key={product._id} data-id={product._id}>
                                    <a href="#" onClick={this._showAside}>
                                        {`펜션 이름: ${product.name}, 리뷰 개수: ${product.reviews.length}`}
                                    </a>
                                </li>
                            )
                        }
                    </ul>
                </div>
                {
                    selectedProduct ?
                        <aside>
                            <div>
                                <img />
                                <h1>{`${selectedProduct.name}`}</h1>
                                <p>{`${selectedProduct.desc}`}</p>
                            </div>
                            <div>
                                <textarea ref={(node) => { textarea = node }}/>
                                <input type="number" ref={(node) => { inputNumber = node }}/>
                                <button onClick={() => {
                                    store.dispatch({
                                        type: 'ADD_REVIEW',
                                        comment: textarea.value,
                                        score: inputNumber.value,
                                        product_id: selectedProduct._id,
                                        user_id: 1
                                    });
                                    textarea.value = '';
                                    inputNumber.value = '';
                                }}>리뷰 등록</button>
                                <ul>
                                    {
                                        selectedProduct.reviews.map(review =>
                                            <li key={review._id} data-id={review._id} data-user-id={review.user_id}>
                                                {`${review.score}: ${review.comment}`}
                                                <button onClick={()=>{
                                                    store.dispatch({
                                                        type: 'REMOVE_REVIEW',
                                                        id: parseInt(review._id)
                                                    });
                                                }}>X</button>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </aside>
                        :
                        null
                }
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
