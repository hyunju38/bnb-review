import React from 'react';

import ProductSearch from '../components/ProductSearch';
import ProductList from './ProductList';
import Side from './Side';

const App = () => {
    return(
        <div>
            <ProductSearch />
            <ProductList />
            <Side />
        </div>
    );
};

export default App;
