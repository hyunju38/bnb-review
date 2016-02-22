import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/reviews';

import App from './containers/App';

const store = createStore(rootReducer, applyMiddleware(thunk));
// class Provider extends Component {
//     getChildContext(){
//         return {
//             store: this.props.store
//         };
//     }
//
//     render(){
//         return this.props.children;
//     }
// }
// Provider.childContextTypes = {
//     store: React.PropTypes.object
// };

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById('root')
);
