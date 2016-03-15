import React from 'react';

const DISPLAY_NAME = 'PRODUCT_NAV';

const ProductNav = () => {
    return (
        <div className="product-nav">
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">BnB Review</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <p className="navbar-text navbar-right"></p>
                        <form className="signin-form navbar-form navbar-right" method="post" action="/signin">
                            <div className="form-group">
                                <input id="email" name="email" placeholder="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" name="password" placeholder="password" className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-success">Sign in</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};
ProductNav.displayName = DISPLAY_NAME;

export default ProductNav;
