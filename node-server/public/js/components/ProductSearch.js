import React from 'react';
import { connect } from 'react-redux';

import { setKeyword } from '../actions/ActionsCreator';

let ProductSearch = ({ dispatch }) => {
    let inputText;

    return(
        <div>
            <input type="text" ref={(node) => { inputText = node }}/>
            <button onClick={()=>dispatch(setKeyword(inputText.value))}>
                Search
            </button>
        </div>
    );
};
// ProductSearch.contextTypes = {
//     store: React.PropTypes.object
// };
// ProductSearch = connect()(ProductSearch);
export default connect()(ProductSearch);
