import fetch from 'isomorphic-fetch';

const API_SERVER_URL = 'http://localhost:8888/products';

const products = () => {
    return dispatch => {
        // products data 요청
        dispatch({
            type: 'REQUEST_PRODUCTS'
        });

        return fetch(API_SERVER_URL)
            .then(response => response.json())
            .then(products => {
                dispatch({
                    type: 'RECIEVE_PRODUCTS',
                    products
                });
            })
            .catch(error => {
                dispatch({
                    type: 'RECIEVE_ERROR'
                });
            });

        // // ajax call => mocha test, XMLHttpRequest is undefined http://stackoverflow.com/questions/32304150/correct-usage-of-sinons-fake-xmlhttprequest
        // return new Promise((resolve, reject) => {
        //     let httpRequest = new XMLHttpRequest();
        //     httpRequest.onload = () => {
        //         if (httpRequest.status >= 200 && httpRequest.status < 400) {
        //             resolve(JSON.parse(httpRequest.response).data);
        //         }
        //     };
        //     httpRequest.onerror = () => {
        //         reject(new Error('error'));
        //     };
        //     httpRequest.open('GET', 'http://api.com/products');
        //     httpRequest.send();
        // })
        // .then((products) => {
        //     dispatch({
        //         type: 'RECIEVE_PRODUCTS',
        //         products
        //     });
        // })
        // .catch((error) => {
        //     dispatch({
        //         type: 'RECIEVE_ERROR',
        //         error
        //     });
        // });
    };
};

export default products;
