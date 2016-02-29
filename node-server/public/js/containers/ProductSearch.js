import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setKeyword } from '../actions/ActionsCreator';

export let ProductSearch = ({ onSearchButtonClick }) => {
    let inputText;
    return(
        <div>
            <div className="input-group">
                <input className="form-control"
                    placeholder="Search for..."
                    ref={(node) => { inputText = node }}
                    type="text"
                />
                <span className="input-group-btn">
                    <button className="btn btn-default"
                        onClick={()=>onSearchButtonClick(inputText.value)}
                        type="button"
                    >
                        Search
                    </button>
                </span>
            </div>
        </div>
    );
};
// export class ProductSearch extends Component {
//     render(){
//         let inputText;
//         const { onSearchButtonClick } = this.props;
//
//         return(
//             <div>
//                 <input type="text" ref={(node) => { inputText = node }}/>
//                 <button onClick={()=>onSearchButtonClick(inputText.value)}>
//                     Search
//                 </button>
//             </div>
//         );
//     }
// }

// ProductSearch.contextTypes = {
//     store: React.PropTypes.object
// };
// ProductSearch = connect()(ProductSearch);
const mapDispatchToProductListProps = (dispatch) => {
    return {
        onSearchButtonClick: (value) => {
            dispatch(setKeyword(value));
        }
    };
};

export default connect(
    null,
    mapDispatchToProductListProps
)(ProductSearch);
