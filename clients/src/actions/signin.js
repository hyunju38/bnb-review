import fetch from 'isomorphic-fetch';

const API_SERVER_URL = process.env.NODE_ENV === 'test' ?
                         'http://localhost:3000/signin' :
                         '/signin';

const signin = (username, password) => {
    return dispatch => {
        dispatch({
            type: 'SIGNIN',
            status: null
        });

        return fetch(API_SERVER_URL, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(json => dispatch({
                type: 'SIGNIN',
                status: 'SUCCESS',
                results: json.results
            }))
            .catch(error => dispatch({
                type: 'SIGNIN',
                status: 'ERROR'
            }));
    }
};

export default signin;