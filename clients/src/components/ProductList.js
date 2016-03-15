import React, { Component } from 'react';

class ProductList extends Component {

    componentDidMount () {
        const { fetchProductList, user } = this.props;

        if (user && user.status === 'SUCCESS') {
            fetchProductList();   
        }
    }
    
    render () {
        const { fetchProductList, products, selectProduct } = this.props;
        const { items, paginator } = products.results;
        let previousClass =  paginator && paginator.curPage === 1 ? 'previous disabled' : 'previous';
        let nextClass = paginator && paginator.curPage === paginator.totalPage ? 'next disabled' : 'next'; 
        
        return(
            <div className="product-list">
                <div className="list-group">
                    {
                        items.map(item =>
                            <a className="list-group-item" href="#" key={item._id}
                                onClick={event => {
                                    event.preventDefault();
                                    selectProduct(item._id)
                                        .then(result => console.log(result));
                                }} >
                                <h4 className="list-group-item-heading">
                                    {item.name}
                                </h4>
                                <p className="list-group-item-text">
                                    {item.desc}
                                </p>
                            </a>
                        )
                    }
                </div>
                <nav>
                    <ul className="pager">
                        <li className={previousClass}>
                            <a href="#" onClick={event => {
                                event.preventDefault();
                                if (previousClass.search('disabled') !== -1) {
                                    return;
                                }
                                fetchProductList(paginator.curPage - 1);
                            }}>
                                {'Previous'}
                            </a>
                        </li>
                        <li className={nextClass}>
                            <a href="#" onClick={event => {
                                event.preventDefault();
                                if (nextClass.search('disabled') !== -1) {
                                    return;
                                }
                                fetchProductList(paginator.curPage + 1);
                            }}>
                                {'Next'}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

// const ProductList = ({
//     products,
//     fetchProductList,
//     selectProduct
// }) => {
//     const { items, paginator } = products.response;
//     let previousClass =  paginator && paginator.curPage === 1 ? 'previous disabled' : 'previous';
//     let nextClass = paginator && paginator.curPage === paginator.totalPage ? 'next disabled' : 'next'; 
    
//     return(
//         <div className="product-list">
//             <div className="list-group">
//                 {
//                     items.map(item =>
//                         <a className="list-group-item" href="#" key={item._id}
//                             onClick={event => {
//                                 event.preventDefault();
//                                 selectProduct(item._id)
//                                     .then(result => console.log(result));
//                             }} >
//                             <h4 className="list-group-item-heading">
//                                 {item.name}
//                             </h4>
//                             <p className="list-group-item-text">
//                                 {item.desc}
//                             </p>
//                         </a>
//                     )
//                 }
//             </div>
//             <nav>
//                 <ul className="pager">
//                     <li className={previousClass}>
//                         <a href="#" onClick={event => {
//                             event.preventDefault();
//                             if (previousClass.search('disabled') !== -1) {
//                                 return;
//                             }
//                             fetchProductList(paginator.curPage - 1);
//                         }}>
//                             {'Previous'}
//                         </a>
//                     </li>
//                     <li className={nextClass}>
//                         <a href="#" onClick={event => {
//                             event.preventDefault();
//                             if (nextClass.search('disabled') !== -1) {
//                                 return;
//                             }
//                             fetchProductList(paginator.curPage + 1);
//                         }}>
//                             {'Next'}
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

export default ProductList;