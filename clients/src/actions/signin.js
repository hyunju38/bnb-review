import fetch from 'isomorphic-fetch';
import jwt from 'jsonwebtoken';

const API_SERVER_URL = process.env.NODE_ENV === 'test' ?
                         'http://localhost:3000/signin' :
                         '/signin';

const signinByToken = token => {
    return dispatch => {
        dispatch({
            type: 'SIGNIN',
            status: null
        });
        
        jwt.verify(token, 'test', (error, decoded) => {
            if (error) {
                return error;
            }

            return fetch(API_SERVER_URL, {
                    method: 'POST',
                    body: JSON.stringify({ 
                        username: decoded.username, 
                        password: decoded.password 
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'ERROR') {
                        throw new Error('status is ERROR');
                    }

                    window.sessionStorage.setItem('token', json.results.token);
                    
                    return dispatch({
                        type: 'SIGNIN',
                        status: 'SUCCESS',
                        results: json.results
                    });
                })
                .catch(error => dispatch({
                    type: 'SIGNIN',
                    status: 'ERROR'
                }));
        });
    };
};

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
            .then(json => {
                if (json.status === 'ERROR') {
                    throw new Error('status is ERROR');
                }

                window.sessionStorage.setItem('token', json.results.token);
                
                return dispatch({
                    type: 'SIGNIN',
                    status: 'SUCCESS',
                    results: json.results
                });
            })
            .catch(error => dispatch({
                type: 'SIGNIN',
                status: 'ERROR'
            }));
    };
};

export { signin, signinByToken };