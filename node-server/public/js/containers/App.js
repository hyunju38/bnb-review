import React from 'react';

import ProductSearch from './ProductSearch';
import ProductList from './ProductList';
import Side from './Side';

const App = () => {
    return(
        <div className="container" style={{ marginTop: 50}}>
            <div className="col-md-offset-2 col-xs-offset-2 col-md-4 col-xs-4">
                <ProductSearch />
                <ProductList />
            </div>
            <div className="col-md-4 col-xs-4">
                <Side />
            </div>
        </div>
    );
};

export default App;
