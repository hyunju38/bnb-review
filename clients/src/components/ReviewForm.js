import React from 'react';

const DISPLAY_NAME = 'REVIEW_FORM';

const ReviewForm = ({
    addReview
}) => {
    let commentInput, scoreInput;
    return (
        <div>
            <form action='/reviews'>
                <div className="form-group">
                    <label htmlFor="comment">{'Comment'}</label>
                    <input id="comment" ref={input => { commentInput = input; }} 
                        type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="score">{'Score'}</label>
                    <input id="score" ref={input => { scoreInput = input; }}
                        type="number" className="form-control" min="1" max="5" />
                </div>
                <button type="submit" className="btn btn-default" 
                    onClick={event => {
                        event.preventDefault();
                        addReview(commentInput.value, scoreInput.value)
                            .then(result => {
                                commentInput.value = '';
                                scoreInput.value = '';
                            });
                    }} >
                    {'Submit'}
                </button>
            </form>
        </div>
    );  
};
ReviewForm.displayName = DISPLAY_NAME;

export default ReviewForm;