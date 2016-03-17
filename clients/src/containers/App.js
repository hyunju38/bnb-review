import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import ProductList from './ProductList';
import ProductInfo from './ProductInfo';
import ReviewForm from '../components/ReviewForm';

const DISPLAY_NAME = 'APP';

const isValidUser = (user) => {
    return user.status === 'SUCCESS';
};

const App = ({
    user
}) => {
    return(
        <div>
            <Navbar />
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    {
                        isValidUser(user) ?
                            <ProductList />
                            :
                            ''
                    }
                </div>
                <div className="col-md-4 col-xs-4">
                    {
                        isValidUser(user) ?
                            <ProductInfo />
                            :
                            <p>
                                Please, sign in.
                            </p>
                    }
                </div>
                <div className="col-md-4 col-xs-4">
                    {
                        isValidUser(user) ?
                            <ReviewForm />
                            :
                            ''
                    }
                </div>
            </div>
        </div>
    );
};
App.displayName = DISPLAY_NAME;


const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(
    mapStateToProps,
    null
)(App);
