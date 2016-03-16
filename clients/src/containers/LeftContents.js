import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductList from '../components/ProductList';

class LeftContents extends Component {

    constructor(props){
        super(props);
        
        this._isValidUser = this._isValidUser.bind(this);
    }
    
    _isValidUser(){
        const { user } = this.props;
        return user.status === 'SUCCESS';
    }
    
    render(){
        return(
            <div>
                {
                    this._isValidUser() ?
                        <ProductList />
                        :
                        <p>
                            Please, sign in.
                        </p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    null
)(LeftContents);