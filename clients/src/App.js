import React, { Component } from 'react';

const DISPLAY_NAME = 'APP';

class App extends Component {
    render () {
        let text = "Hello, world!!!!";
        return (
            <h1 className="test-class">{text}</h1>
        );
    }
}
App.displayName = DISPLAY_NAME;
export default App;
