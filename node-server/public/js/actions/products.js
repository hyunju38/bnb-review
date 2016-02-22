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

export default products;
