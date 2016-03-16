import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import signin from '../actions/signin';

const DISPLAY_NAME = 'NAVBAR';

class Navbar extends Component {
    
    constructor(props){
        super(props);
        
        this._input = new Map();
        
        this.handleClickSignIn = this.handleClickSignIn.bind(this);
        this.handleClickSignOut = this.handleClickSignOut.bind(this);
        this._getUsername = this._getUsername.bind(this);
        this._isValidUser = this._isValidUser.bind(this);
        this._setInput = this._setInput.bind(this);
    }
    
    handleClickSignIn(event){
        event.preventDefault();
        
        const { signin } = this.props;
        
        const emailValue = typeof this._input.get('email') !== 'undefined' ? this._input.get('email').value : '';
        const passwordValue = typeof this._input.get('password') !== 'undefined' ? this._input.get('password').value : '';
        
        signin(emailValue, passwordValue);
    }
    
    handleClickSignOut(event){
        event.preventDefault();
        
        const { signout } = this.props;
        signout();
        
        window.sessionStorage.removeItem('token');
    }
    
    _isValidUser(){
        const { user } = this.props;
        return user.status === 'SUCCESS';
    }
    
    _getUsername(){
        const { user } = this.props;
        return this._isValidUser() ? user.results.username : '';
    }
    
    _setInput(key){
        return input => {
            this._input.set(key, input);
        };
    }
    
    render(){
        return(
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" 
                            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only"> {'Toggle navigation'} </span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">{'BnB Review'}</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        {
                            this._isValidUser() ?
                                <p className="navbar-text navbar-right">
                                    {`Hi, ${this._getUsername()} | `}
                                    <a href="#" className="navbar-link"
                                        onClick={this.handleClickSignOut} >
                                        {'sign out'} 
                                    </a>
                                </p>
                                :
                                <form className="navbar-form navbar-right">
                                    <div className="form-group">
                                        <input id="email" name="email" placeholder="email" className="form-control"
                                            ref={this._setInput('email')} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" id="password" name="password" placeholder="password" 
                                            className="form-control" ref={this._setInput('password')} />
                                    </div>
                                    <button type="submit" className="btn btn-success"
                                        onClick={this.handleClickSignIn} > {'Sign in'} </button>
                                </form>
                        }
                    </div>
                </div>
            </nav>
        );    
    }
}
Navbar.propTypes = {
    user: PropTypes.shape({
        status: PropTypes.string
    }).isRequired,
    signin: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired
};

// const Navbar = ({
//     signin,
//     signout,
//     user
// }) => {
//     let emailInput, passwordInput;
//     return (
//         <div className="product-nav">
//             <nav className="navbar navbar-inverse">
//                 <div className="container">
//                     <div className="navbar-header">
//                         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
//                             <span className="sr-only">Toggle navigation</span>
//                             <span className="icon-bar"></span>
//                             <span className="icon-bar"></span>
//                             <span className="icon-bar"></span>
//                         </button>
//                         <a className="navbar-brand" href="#">{'BnB Review'}</a>
//                     </div>
//                     <div id="navbar" className="navbar-collapse collapse">
//                         {
//                             user.status === 'SUCCESS' ?
//                                 <p className="navbar-text navbar-right">
//                                     {`Hi, ${user.results.username}`}
//                                     <button type="button" className="btn btn-link"
//                                         onClick={event => {
//                                             event.preventDefault();
//                                             signout();
//                                             sessionStorage.removeItem('token');
//                                         }} > {'Sign out'} </button>
//                                 </p> 
//                                 :
//                                 <form className="signin-form navbar-form navbar-right" method="post" action="/signin">
//                                     <div className="form-group">
//                                         <input id="email" name="email" placeholder="email" className="form-control"
//                                             ref={input => emailInput = input} />
//                                     </div>
//                                     <div className="form-group">
//                                         <input type="password" id="password" name="password" placeholder="password" className="form-control"
//                                             ref={input => passwordInput = input} />
//                                     </div>
//                                     <button type="submit" className="btn btn-success"
//                                         onClick={event => {
//                                             event.preventDefault();
//                                             signin(emailInput.value, passwordInput.value);
//                                         }} > {'Sign in'} </button>
//                                 </form>
//                         }
//                     </div>
//                 </div>
//             </nav>
//         </div>
//     );
// };
Navbar.displayName = DISPLAY_NAME;

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signin(username, password){
            return dispatch(signin(username, password));
        },
        signout(){
            return dispatch({
                type: 'SIGNOUT',
                status: null
            });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
