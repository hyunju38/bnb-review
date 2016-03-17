import React from 'react';

const DISPLAY_NAME = 'INTRODUCTION';

const Introduction = () => {
    return(
        <div className="jumbotron">
            <div className="container">
                <h1>Hello, world!</h1>
                <p>
                    It's just dummy test. It's just dummy test. It's just dummy test.
                    It's just dummy test. It's just dummy test. It's just dummy test.
                    It's just dummy test. It's just dummy test. It's just dummy test.
                </p>
            </div>
        </div>
    );
};
Introduction.displayName = DISPLAY_NAME;

export default Introduction;
