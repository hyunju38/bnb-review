import React, { Component } from 'react';

class App extends Component {
    render(){
        return(
            <div>
                <div>
                    <input type="text"/>
                    <button>Search</button>
                </div>
                <div>
                    <ul>
                        <li>가 펜션</li>
                        <li>나 펜션</li>
                        <li>다 펜션</li>
                    </ul>
                </div>
                <aside>
                    <div>
                        <img />
                        <h1>가 펜션</h1>
                        <p>여기 저기에 있는 펜션입니다.</p>
                    </div>
                    <div>
                        <ul>
                            <li>여기 좀 괜찮은 듯</li>
                            <li>좀 지저분 했으요</li>
                            <li>다음에 또 와야지~</li>
                        </ul>
                    </div>
                </aside>
            </div>
        );
    }
}

export default App;
